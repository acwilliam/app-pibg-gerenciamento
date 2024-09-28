import {Component, Input, Output, EventEmitter } from '@angular/core';
import { Cadastro } from '../Cadastro';

@Component({
  selector: 'app-modal-detalhe-crianca',
  templateUrl: './modal-detalhe-crianca.component.html',
  styleUrl: './modal-detalhe-crianca.component.css'
})
export class ModalDetalheCriancaComponent {
  @Input() crianca: Cadastro = {
    nomeResponsavel:  '',
    nomeCrianca:  '',
    telefoneResponsavel:  '',
    observacao:  '',
    horario: '',
    id: '',
    selecionado: true,
    dataNascimento: '',
    sexo:''
  };
  @Output() fecharModal = new EventEmitter<void>();

  atualizarCadastro(crianca: Cadastro) {
    crianca.selecionado = true;
    console.log('marcado a presença')
    /*this.cadastroService.atualizarCadastro(crianca)
      .subscribe(() => {
        // Atualização realizada com sucesso
        this.modalService.dismissAll(); // Fecha todos os modais
      }, (error) => {
        // Tratar erro
      });*/
  }
}
