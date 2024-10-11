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
      const user = await this.authService.fazerLogin(this.usuario);
      if (user) {
        this.emailDataService.setEmail(this.usuario.email);

        this.validarPerfilUsuarioService.buscarCadastrosByEmail(this.usuario.email).pipe(
          map(response => {
            if (response.isAdmin) {
              console.log('is admin', response.isAdmin);
              this.router.navigate(['/pagina-principal']);
            } else {
              console.log('is membro');
              this.router.navigate(['/usuario-kids']);
            }
            return response; // Assuming you might use the response later
          })
        ).subscribe(
          validatedUser => {
            // Do something with validatedUser (optional)
          },
          error => {
            console.error('Error fetching user profile:', error);
            // Handle error in a user-friendly way
            this.errorMessage = 'Erro ao obter perfil do usuário.';
          }
        );
      }
    } catch (error) {
      this.errorMessage = "Email ou senha incorretos";
    }
  }

  cadastrar() {
    this.router.navigate(['/criar-conta']);
  }
}

