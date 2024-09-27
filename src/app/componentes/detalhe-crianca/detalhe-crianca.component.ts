import { Cadastro } from './../Cadastro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-detalhe-crianca',
  templateUrl: './detalhe-crianca.component.html',
  styleUrls: ['./detalhe-crianca.component.css']
})
export class DetalheCriancaComponent implements OnInit {
   cadastro: Cadastro = {
    nomeResponsavel: '',
    nomeCrianca: '' ,
    telefoneResponsavel: '',
    observacao: '',
    horario: '',
    id: '',
    selecionado: false

   }

  constructor(
    private route: ActivatedRoute,
    private service: CadastroService
  ) { }

  ngOnInit(): void {
    // Pegando o ID da URL
   // this.id = +this.route.snapshot.paramMap.get('id')!;
    // Buscar os detalhes da criança usando o ID
    console.log(this.route.snapshot.paramMap.get('id'))
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.obterDetalhesCrianca(id!);

    this.route.params.subscribe(params => {
      this.cadastro.id = params['id'];
      console.log('parametro',params['id'])
    });
  }

  obterDetalhesCrianca(idCadastro: string): void {
    console.log(idCadastro)
    this.service.buscarCadastroPorId(idCadastro).subscribe(response => {
      console.log('Resultado da busca:', response);
      if (response) {
        this.cadastro = response;
      } else {
        console.error('Cadastro não encontrado');
      }

    });
  }

  atualizarItem() {
    this.route.params.subscribe(params => {
      this.cadastro.id = params['id'];
      console.log('parametro',params['id'])
    });
    console.log('atualiando cadastro ', this.cadastro.id)
      this.service.atualizarCadastro(this.cadastro.id)
  }
}
