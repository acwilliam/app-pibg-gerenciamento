import { Cadastro } from '../Cadastro';
import { AuthService } from './../auth.service';
import { ValidarPerfilUsuarioService } from './../validar-perfil-usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckInModalComponent } from '../../modais/check-in-modal/check-in-modal.component';


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
    private authService: AuthService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
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

  realizarCheckIn(enterAnimationDuration: string, exitAnimationDuration: string){
    const dialogRef = this.dialog.open(CheckInModalComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { children: this.children }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Check-in realizado para a criança com ID:', result);
        // Aqui você pode implementar a lógica de check-in para a criança selecionada
      }
    });
  }
}
