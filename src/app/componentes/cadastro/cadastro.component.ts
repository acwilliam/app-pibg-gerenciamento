import { Component } from '@angular/core';
import { Cadastro } from '../Cadastro';
import { Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  constructor(
    private router: Router,
    private service: CadastroService
  ){
  }

  cadastro: Cadastro = {
    nomeResponsavel:  '',
    nomeCrianca:  '',
    telefoneResponsavel:  '',
    observacao:  ''
  }

  cadastrar() {
    // Lógica para cadastrar os dados (ex: enviar para um backend)
    console.log('test',this.cadastro)
    console.log('Dados a serem cadastrados:', {
      nomeResponsavel: this.cadastro.nomeResponsavel,
      nomeCrianca: this.cadastro.nomeCrianca,
      telefoneResponsavel: this.cadastro.telefoneResponsavel,
      observacao: this.cadastro.observacao
    });

    this.service.cadastrarCrianca(this.cadastro)

    this.cadastro.nomeResponsavel = '';
    this.cadastro.nomeCrianca = '';
    this.cadastro.telefoneResponsavel = '';
    this.cadastro.observacao = '';

 
  }

  cancelar() {
    this.router.navigate(['/listaCrianca'])

  }
}