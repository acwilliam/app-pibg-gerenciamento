import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../cadastro.service';
import { Categoria } from '../model/categoriaGrupo';
import { Grupo } from '../model/grupo';
import { BuscarCepService } from '../services/buscar-cep.service';
import { DadoUsuario } from '../model/dadoUsuario';
import { Cep } from '../model/cep';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-grupo',
  templateUrl: './cadastrar-grupo.component.html',
  styleUrl: './cadastrar-grupo.component.css'
})
export class CadastrarGrupoComponent implements OnInit {
  modoEdicao: boolean = false;
  idGrupo: string = '';

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
    id:'',
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
    private buscarCepService: BuscarCepService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.cadastroService.getCategorias().subscribe(categorias => this.categorias = categorias);
    this.route.params.subscribe(params => {
    if (params['id']) {
      this.modoEdicao = true;
      this.idGrupo = params['id'];
      this.cadastroService.getGrupo(this.idGrupo).subscribe(grupo => {
        if(grupo) {
          this.grupo = grupo;
          this.dadosCep = grupo.dadoEndereco;
          this.categorias.forEach(categoria => {
            categoria.categoriaSelecionada = grupo?.categorias.includes(categoria.nome);
          });
        }
      });
    }
  });
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

    if (this.modoEdicao) {
      this.cadastroService.atualizarGrupo(this.idGrupo, this.grupo)
        .then(() => {
          this.router.navigate(['/detalhe-grupo', this.idGrupo]);
        })
        .catch(error => {
          console.error('Erro ao atualizar grupo:', error);
        });
    } else {
      this.cadastroService.cadastrarGrupo(this.grupo)
        .then(docRef => {
          this.router.navigate(['/detalhe-grupo', docRef.id]);
        })
        .catch(error => {
          console.error('Erro ao cadastrar grupo:', error);
        });
    }
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

  cancelar() {
    throw new Error('Method not implemented.');
  }

}
