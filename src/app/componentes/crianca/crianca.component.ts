import { Component } from '@angular/core';
import { Cadastro } from '../Cadastro';

@Component({
  selector: 'app-crianca',
  templateUrl: './crianca.component.html',
  styleUrl: './crianca.component.css'
})
export class CriancaComponent {
  listaCrianca: Cadastro[] = [
    {
      nomeResponsavel: 'string',
      nomeCrianca: 'string' ,
      telefoneResponsavel: 'string',
      observacao: 'string' 
    }
  ]
}
