import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './login-usuario/Usuario';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    public auth: AngularFireAuth
  ) {
    this.user$ = this.auth.authState.pipe(
      catchError(error => {
        console.error('Erro ao obter estado de autenticação:', error);
        return of(null);
      })
    );
   }

  async fazerLogin(usuario: Usuario): Promise<firebase.User | null>{

    try {
      const credencial = await this.auth.signInWithEmailAndPassword(usuario.email, usuario.senha)
      return  credencial.user
    } catch (error) {
        throw error
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      switchMap(user => of(!!user)),
      catchError(error => {
        console.error('Erro ao verificar estado de login:', error);
        return of(false);
      })
    );
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/login'])
  }
  getCurrentUser(): Observable<firebase.User | null> {
    return this.user$;
  }
}
