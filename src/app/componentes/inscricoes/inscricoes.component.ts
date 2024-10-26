import { Evento } from './../model/Evento';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-inscricoes',
  templateUrl: './inscricoes.component.html',
  styleUrl: './inscricoes.component.css'
})
export class InscricoesComponent {
  abaAtiva: string = 'inscrever';
  eventosIncristo: Evento = {
    id: '',
    nome: ''
  }
  eventosDisponiveis = [
    this.eventosIncristo
    //{ id: null, nome: '' },
    //{ id: 2, nome: 'Evento B' }
    // Adicione mais eventos conforme necessário
  ];
  eventosInscritos = [
    this.eventosIncristo
    // Adicione mais eventos conforme necessário
  ];

  constructor( private location: Location) { }

  ngOnInit(): void {}

  selecionarAba(aba: string) {
    this.abaAtiva = aba;
  }

  inscreverEvento(evento: any) {
    this.eventosInscritos.push(evento);
    this.eventosDisponiveis = this.eventosDisponiveis.filter(e => e.id !== evento.id);
    this.selecionarAba('inscricoes'); // Opcional, se quiser mudar para "Minhas Inscrições" após inscrever-se
  }

  voltar() {
    this.location.back();
  }
}
