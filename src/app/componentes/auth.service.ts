import { EmailDataService } from './email-data.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './login-usuario/Usuario';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ValidarPerfilUsuarioService } from './validar-perfil-usuario.service';
import { PessoaService } from './pessoa.service';


interface User {
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    private emailDataSerivce: EmailDataService,
    private pessoaService: PessoaService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   async fazerLogin(usuario: Usuario) {
    try {
      await this.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
      this.pessoaService.buscarCadastroByEmail(usuario.email).pipe(
        tap(response => {
          if (response) {
            const { email, role } = response;
            const user = { email, role };
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            console.log('logando email', user);

            if (response.role === 'A') {
              console.log('is admin ###');
              this.router.navigate(['/pagina-principal']).then(() => {
                console.log('Navegação para pagina-principal completa');
              });
            } else if (response.role === 'M')  {
              console.log('is membro  ###');
              this.router.navigate(['/usuario-kids']).then(() => {
                console.log('Navegação para usuario-kids completa');
              });
            }
          } else {
            console.log('Nenhuma resposta para o email fornecido');
          }
        }),
        catchError(error => {
          console.error('Error fetching user data', error);
          return throwError(error);
        })
      ).subscribe();
    } catch (error) {
      console.error('Error during login', error);
      throw error;
    }
  }
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  async logout(): Promise<void> {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }

  isLogado(): boolean {
    const user = this.currentUserValue;
    return user !== null
  }
  isResponsible(email: string): boolean {
    const user = this.currentUserValue;
    return user !== null && user.email === email;
  }
  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user !== null && user.role === 'A';
  }
}
