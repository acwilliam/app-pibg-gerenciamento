import { ValidarPerfilUsuarioService } from './../validar-perfil-usuario.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Usuario } from './Usuario';
import { Router } from '@angular/router';
import { EmailDataService } from '../email-data.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {
  errorMessage?: string;
  usuario: Usuario = {
    email:'',
    senha: ''
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private emailDataService: EmailDataService,
    private validarPerfilUsuarioService: ValidarPerfilUsuarioService
  ) { }

  ngOnInit() {

  }
  async fazerLogin() {
    try {
      await this.authService.fazerLogin(this.usuario);
    } catch (error) {
      this.errorMessage = "Email ou senha incorretos";
    }
  }

  cadastrar() {
    this.router.navigate(['/criar-conta']);
  }
}

