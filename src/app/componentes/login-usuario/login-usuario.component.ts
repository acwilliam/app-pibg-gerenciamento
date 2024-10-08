import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Usuario } from './Usuario';
import { Router } from '@angular/router';
import { EmailDataService } from '../email-data.service';

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
    private emailDataService: EmailDataService
  ) { }

  ngOnInit() {

  }

  async fazerLogin(){
    this.authService.fazerLogin(this.usuario)
        .then(user => {
            if (user) {
                this.emailDataService.setEmail(this.usuario.email);
                this.router.navigate(['/pagina-principal']);
            }
        })
        .catch(error => {
           this.errorMessage = "Email ou senha incorretos"
        });
  }

  cadastrar() {
    this.router.navigate(['/criar-conta']);
  }
}
