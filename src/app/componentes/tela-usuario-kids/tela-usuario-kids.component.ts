import { Cadastro } from '../Cadastro';
import { AuthService } from './../auth.service';
import { ValidarPerfilUsuarioService } from './../validar-perfil-usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tela-usuario-kids',
  templateUrl: './tela-usuario-kids.component.html',
  styleUrl: './tela-usuario-kids.component.css'
})
export class TelaUsuarioKidsComponent implements OnInit{
  children: any[] = [ ];
  emailRecebido: string = '';
  constructor (
    private router: Router,
    private validarPerfilService: ValidarPerfilUsuarioService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    console.log('buscando criancas tela usuario kids')
    this.buscarCriancas();
  }

  adicionarCrianca() {
    this.router.navigate([`/cadastro/${this.emailRecebido}`])
  }



  buscarCriancas() {
    this.emailRecebido = this.authService.currentUserValue?.email || '';

   this.validarPerfilService.buscarCadastros(this.emailRecebido).subscribe((cadastros: Cadastro[]) => {
    this.children = cadastros;
    console.log(cadastros);
  });
  }

  logout() {
    this.authService.logout();
  }

}
