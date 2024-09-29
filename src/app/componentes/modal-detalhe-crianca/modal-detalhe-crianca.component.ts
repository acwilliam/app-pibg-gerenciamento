import {Component, Input, Output, EventEmitter } from '@angular/core';
import { Cadastro } from '../Cadastro';
import { CadastroService } from '../cadastro.service';

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

  modalAberto = true;
  constructor(
    private cadastroService: CadastroService
  ) { }

  abrirModal(crianca: Cadastro) {
    console.log('abrindo modal ', crianca)
    this.crianca = crianca;
    this.atualizarCadastro(this.crianca)
  }

  atualizarCadastro(crianca: Cadastro) {
    crianca.selecionado = true;
    console.log('atualizando modal',crianca)

    this.cadastroService.atualizarCadastroPorNome(crianca.nomeCrianca)
    .subscribe(
      () => {console.log('Registro atualizado')},
      error => {() => console.error('Erro ao atualizar cadastro:', error)
      }
    )
    this.fecharModal();
  }

  fecharModal() {
    this.modalAberto = false;
    console.log('fechando modal',this.abrirModal)
  }
}
