import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { PessoaService } from './pessoa.service';
import { AuthService } from './auth.service';
import { EmailDataService } from './email-data.service';
import { CadastroService } from './cadastro.service';
import { CacularIdadeService } from './cacular-idade.service';
import { Router } from '@angular/router';
import { Cadastro } from './Cadastro';


interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  callback?: () => void;
  visible?: boolean;
}
interface ValidarUsuario {
  isPossuiFilhos: boolean,
  isMembro: boolean,
  isAdmin: boolean,
  isVoluntario: boolean,
  emailRecebido: string,
}

@Injectable({
  providedIn: 'root'
})
export class ValidarPerfilUsuarioService {
  children: any[] = [ ];
  emailRecebido: string = '';
  validaUsuario: ValidarUsuario ={
    isMembro: true,
    isAdmin: false,
    isVoluntario: false,
    emailRecebido: '',
    isPossuiFilhos: false,
  }

  constructor(
    private authService: AuthService,
    private emailDataService: EmailDataService,
    private pessoaService: PessoaService,
    private cadastroService: CadastroService,
    private caculaIdadeService: CacularIdadeService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.emailDataService.currentEmail.subscribe(email => {
      if (email) {
        this.validaUsuario.emailRecebido = email
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
    this.buscarCadastros(this.validaUsuario.emailRecebido)

  }


  logout() {
    this.authService.logout();
  }

  buscarCadastrosByEmail(email: string): Observable<ValidarUsuario> {
    return this.pessoaService.buscarCadastroByEmail(email).pipe(
      map(response => {
        if (response) {
          if (response.role === 'M' ) {
              console.log('response', response.role)
              this.validaUsuario.isMembro = true
            }
            if (response.role === 'A') {
              this.validaUsuario.isAdmin = true
            }
            if (response.role === 'V') {
              this.validaUsuario.isVoluntario = true
            }
          console.log('isAdmin', this.validaUsuario.isAdmin)
          return this.validaUsuario;
        }
        return this.validaUsuario
      })
    );
  }

  buscarCadastros(email: string): Observable<Cadastro[]> {
    return this.cadastroService.buscarCadastrosByEmail(email).pipe(
      tap((dados: Cadastro[]) => {
        this.children = dados;
        this.validaUsuario.isPossuiFilhos = true;
        for (const cadastro of this.children) {
          this.caculaIdadeService.calcularIdade(cadastro);
        }
      })
    );
  }

}
