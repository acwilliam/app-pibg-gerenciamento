import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupo } from '../model/grupo';
import { Cep } from '../model/cep';
import { CadastroService } from '../cadastro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../Pessoa';
import { AdicionarPessoaModalComponent } from '../../modais/adicionar-pessoa-modal/adicionar-pessoa-modal.component';




@Component({
  selector: 'app-detalhe-grupo',
  templateUrl: './detalhe-grupo.component.html',
  styleUrl: './detalhe-grupo.component.css'
})
export class DetalheGrupoComponent implements OnInit {
  pessoa: Pessoa =  {id:'',nome: '', email: '', sobrenome: '', role: ''  }
  pessoas : Pessoa[] = []
  pessoasDisponiveis: Pessoa[] = [];
  @ViewChild(AdicionarPessoaModalComponent) modal!: AdicionarPessoaModalComponent;

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
    id: '',
    nome: '',
    dataAbertura: new Date(),
    diaSemana: '',
    horario: '',
    perfil: '',
    categorias: [''],
    primeiro_lider: '',
    segundo_lider: '',
    terceiro_lider: '',
    quarto_lider: '',
    dadoEndereco: this.dadosCep,
  };
  endereco: string = '';

  constructor(private route: ActivatedRoute,
    private cadastroService: CadastroService,
    private pessoaService: PessoaService,
    private router: Router) {

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.buscarCadastroGrupo(id!);

  }

  buscarCadastroGrupo(id: string) {
    this.cadastroService.getGrupo(id).subscribe(grupo => {
      if (grupo) {
        this.grupo = grupo;
        this.grupo.id = id;
        if (this.grupo.pessoas) {
          this.pessoas = this.grupo.pessoas
        }
        this.endereco = `${grupo.dadoEndereco.logradouro}, ${grupo.dadoEndereco.bairro}, ${grupo.dadoEndereco.localidade} - ${grupo.dadoEndereco.uf}, ${grupo.dadoEndereco.pais}, ${grupo.dadoEndereco.numero}`;
      } else {
        console.log('Grupo não encontrado');
      }
    });
  }

  buscarPessoas() {
    this.pessoaService.buscarAllPessoas().subscribe(pessoas => {
      this.pessoasDisponiveis = pessoas;
      this.modal.openModal();
    });
  }

  adicionarPessoa(pessoa: any) {
    this.grupo.pessoas?.push(pessoa)
    this.cadastroService.adicionarPessoaAoGrupo(pessoa, this.grupo.id)
  }


  editarGrupo() {
    this.router.navigate(['/cadastrar-grupos', {
      grupo: JSON.stringify(this.grupo),
      endereco: this.endereco,
      id: this.grupo.id
    }]);
  }
  removerPessoa(email: string) {
    console.log("removendo", email)
    this.cadastroService.removerPessoaDoGrupo(this.grupo, email);
  }
}
