import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { EmailDataService } from '../email-data.service';
import { Pessoa } from '../Pessoa';
import { PessoaService } from '../pessoa.service';
import { catchError, map, Observable, of } from 'rxjs';

interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  callback?: () => void;
  visible?: boolean;
}


@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent  {
  isMembro: boolean = true;
  isAdmin: boolean = false;
  isVoluntario: boolean = false
  menuItems: MenuItem[] = [
    { label: 'cadastro', route: '/cadastro', icon: 'home', visible: true },
    { label: 'Crianças', route: '/lista-crianca', icon: 'shopping_basket', visible: this.isAdmin || this.isVoluntario },
    { label: 'sair', callback: () => this.logout(), icon: 'exit_to_app', visible: true },
  ];
  menuActive = false;

  constructor (
    private authService: AuthService,
    private emailDataService: EmailDataService,
    private pessoaService: PessoaService
  )  {}

  ngOnInit() {
    this.emailDataService.currentEmail.subscribe(email => {
      if (email) {
        console.log('Email recebido no ngOnInit:', email);
        this.validarUsuario(email).subscribe(
          sucesso => {
            if (sucesso) {
              console.log('Usuário validado com sucesso');
            } else {
              console.log('Falha na validação do usuário');
            }
          },
          erro => console.error('Erro na validação do usuário:', erro)
        );
      }
    });
  }
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  logout() {
    this.authService.logout();
  }

  navigateToRoute() {
    this.menuActive = false;
  }


  validarUsuario(email: string): Observable<boolean> {
    console.log('Iniciando validação do usuário:', email);

    return this.pessoaService.buscarCadastroByEmail(email).pipe(
      map(response => {
        console.log('Resposta recebida:', response);
        if (response) {
          console.log('aaaaaaaaaaaaaaaa'); // Adicionado para debug
          this.isMembro = response.role === 'M';
          this.isVoluntario = response.role === 'V';
          this.isAdmin = response.role === 'A';

          console.log('Papel do usuário:', { isMembro: this.isMembro, isVoluntario: this.isVoluntario, isAdmin: this.isAdmin });

          this.atualizarMenuItems();
          return true;
        }
        console.log('Nenhum usuário encontrado');
        return false;
      }),
      catchError(error => {
        console.error('Erro ao validar usuário:', error);
        return of(false);
      })
    );
  }

  private atualizarMenuItems() {
    this.menuItems = [
      { label: 'cadastro', route: '/cadastro', icon: 'home', visible: true },
      { label: 'Crianças', route: '/lista-crianca', icon: 'shopping_basket', visible: this.isAdmin || this.isVoluntario },
      { label: 'sair', callback: () => this.logout(), icon: 'exit_to_app', visible: true },
    ];
    console.log('Menu items atualizados:', this.menuItems);
  }
}
