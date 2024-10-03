import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './login-usuario/Usuario';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    public auth: AngularFireAuth
  ) { }

  async fazerLogin(usuario: Usuario){

    try {
      const credencial = await this.auth.signInWithEmailAndPassword(usuario.email, usuario.senha)
      this.usuarioAutenticado = true;
      return  credencial
    } catch (error) {
        throw error
    }
  }

  async usuarioEstaAutenticado(){

    return this.usuarioAutenticado;

  }

}
