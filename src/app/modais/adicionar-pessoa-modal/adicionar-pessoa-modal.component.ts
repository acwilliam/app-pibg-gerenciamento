import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pessoa } from '../../componentes/Pessoa';

@Component({
  selector: 'app-adicionar-pessoa-modal',
  templateUrl: './adicionar-pessoa-modal.component.html',
  styleUrl: './adicionar-pessoa-modal.component.css'
})
export class AdicionarPessoaModalComponent implements OnInit {

  @Input() pessoas: Pessoa[] = [];
  @Output() pessoaAdicionada = new EventEmitter<Pessoa>();
  displayStyle = 'none';
  pessoaSelecionada: Pessoa =  {id:'',nome: '', email: '', sobrenome: '', role: ''  }

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.displayStyle = 'flex';
  }

  closeModal() {
    this.displayStyle = 'none';
  }

  salvarPessoa() {
    console.log('pessoa selecionada', this.pessoaSelecionada)
    this.pessoaAdicionada.emit(this.pessoaSelecionada);
    this.closeModal();
  }
}
