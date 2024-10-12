import { CacularIdadeService } from './../cacular-idade.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { EmailDataService } from '../email-data.service';
import { PessoaService } from '../pessoa.service';
import { catchError, map, Observable, of } from 'rxjs';
import { CadastroService } from '../cadastro.service';
import { Cadastro } from '../Cadastro';
import { Router } from '@angular/router';


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
  children: any[] = [ ];
  isPossuiFilhos: boolean = false
  isMembro: boolean = true;
  isAdmin: boolean = false;
  isVoluntario: boolean = false
  emailRecebido: string = '';
  menuItems: MenuItem[] = [
    { label: 'cadastro', route: '/cadastro', icon: 'home', visible: true },
    { label: 'Crianças', route: '/lista-crianca', icon: 'shopping_basket', visible: this.isAdmin || this.isVoluntario },
    { label: 'sair', callback: () => this.logout(), icon: 'exit_to_app', visible: true },
  ];
  menuActive = false;

  constructor (
    private authService: AuthService,
    private emailDataService: EmailDataService,
    private pessoaService: PessoaService,
    private cadastroService: CadastroService,
    private caculaIdadeService: CacularIdadeService,
    private router: Router,
  )  {}

  ngOnInit() {
    console.log('passo aqui antes')
    this.emailDataService.currentEmail.subscribe(email => {
      if (email) {
        this.emailRecebido = email
        this.buscarCadastrosByEmail(email).subscribe(
          sucesso => {
            if (sucesso) {
              console.log('Dados Retornado com suceso');
            } else {
              console.log('Usuario não é responsável por nenhuma criança');
            }
          },
          erro => console.error('Erro na validação do usuário:', erro)
        );
      }
    });
    this.buscarCadastros(this.emailRecebido)

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


  buscarCadastrosByEmail(email: string): Observable<boolean> {
    return this.pessoaService.buscarCadastroByEmail(email).pipe(
      map(response => {
        if (response) {
          console.log('response', response.role)
          this.isMembro = response.role === 'M';
          this.isVoluntario = response.role === 'V';
          this.isAdmin = response.role === 'A';
          this.atualizarMenuItems(response.email);
          console.log('isAdmin', this.isAdmin)
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

  private atualizarMenuItems(email: string) {
    this.menuItems = [
      { label: 'cadastro', route:`/cadastro/${email}`, icon: 'home', visible: true },
      { label: 'Crianças', route: '/lista-crianca', icon: 'shopping_basket', visible: this.isAdmin || this.isVoluntario },
      { label: 'sair', callback: () => this.logout(), icon: 'exit_to_app', visible: true },
    ];
  }

  buscarCadastros(email: string): void {
    this.cadastroService.buscarCadastrosByEmail(email).subscribe({
      next: (dados: Cadastro[]) => {
        this.children = dados;
        this.isPossuiFilhos = true
        for (const cadastro of this.children) {
          this.caculaIdadeService.calcularIdade(cadastro);
        }
      }
    });
  }
}

