import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../cadastro.service';
import { Categoria } from '../model/categoriaGrupo';
import { Grupo } from '../model/grupo';
import { BuscarCepService } from '../services/buscar-cep.service';
import { DadoUsuario } from '../model/dadoUsuario';
import { Cep } from '../model/cep';

@Component({
  selector: 'app-cadastrar-grupo',
  templateUrl: './cadastrar-grupo.component.html',
  styleUrl: './cadastrar-grupo.component.css'
})
export class CadastrarGrupoComponent implements OnInit {
cancelar() {
throw new Error('Method not implemented.');
}

  categorias: Categoria[] = [
    {id: '', nome: '', grupos: 0, descricao: '', categoriaSelecionada: false }
  ];

  isLoading: any;
  cep: string = '';
  dadosCep: Cep = {
    cep:'',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: '',
    pais: 'Brasil'
  }
  grupo: Grupo = {
    nome: '',
    dataAbertura: new Date(),
    diaSemana: '',
    perfil: '',
    horario: '',
    categorias: [],
    primeiro_lider:'',
    segundo_lider:'',
    terceiro_lider:'',
    quarto_lider:'',
    dadoEndereco: this.dadosCep,
  };

  nomeGrupoInvalido: boolean = false;

  constructor(private cadastroService: CadastroService,
    private buscarCepService: BuscarCepService
  ) {
  }
  ngOnInit(): void {
    this.cadastroService.getCategorias().subscribe(categorias => this.categorias = categorias);

  }


  cadastrarGrupo() {
    if (!this.grupo.nome) {
      this.nomeGrupoInvalido = true;
      return;
    }

    this.nomeGrupoInvalido = false;
    this.grupo.categorias = this.categorias
      .filter(categoria => categoria.categoriaSelecionada)
      .map(categoria => categoria.nome);
    this.grupo.dadoEndereco = this.dadosCep;
    console.log('Grupo cadastrado:', this.grupo);
    this.cadastroService.cadastrarGrupo(this.grupo);

  }

  onCepInput() {
    if (this.cep.length === 9) {
      this.buscarCep();
    }
  }

  buscarCep() {
      this.buscarCepService.buscar(this.cep).subscribe(
        (dados) => {
          this.dadosCep = dados;
          this.dadosCep.pais = 'Brasil';

          console.log("dados local", this.dadosCep);
        },
        (erro) => {
          console.error('Erro ao buscar CEP:', erro);
        }
      );
  }


  camposPreenchidos(): boolean {
    return !!this.grupo.nome && this.grupo.nome != '' &&
           !!this.grupo.dataAbertura &&
           !!this.grupo.diaSemana && this.grupo.diaSemana != '' &&
           !!this.grupo.perfil &&  this.grupo.perfil != '' &&
           !!this.grupo.horario &&  this.grupo.horario != '' &&
           !!this.dadosCep.numero &&
           !!this.dadosCep.logradouro &&
           !!this.dadosCep.bairro &&
           !!this.dadosCep.pais &&
           !!this.dadosCep.estado &&
           !!this.dadosCep.localidade &&
           this.validarLideres()
  }

  validarLideres(): boolean {
    return this.grupo.primeiro_lider != '' || this.grupo.segundo_lider != '' || this.grupo.terceiro_lider != ''|| this.grupo.quarto_lider != '';
  }

  formatCep(event: any): void {
    let value = event.target.value.replace(/\D/g, ''); 
    if (value.length > 5) {
      value = value.substring(0, 5) + '-' + value.substring(5, 9);
    }
    this.cep = value;
  }
}
