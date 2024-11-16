import { MatTableDataSource } from '@angular/material/table';
import { CadastroService } from './../cadastro.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
export interface Funcao {
  name: string;
  ministerio: string;
  descricao: string;
}

export interface Ministerio {
  nome: string;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['ministerio', 'funcao', 'descricao'];
  dataSource: MatTableDataSource<Funcao>;
  ministerrioSelecionado?: string
  ministerio: Ministerio = { nome: '' }
  funcao: Funcao = {
    name: '',
    ministerio: '',
    descricao: ''
  };


  ministerios: Ministerio[] = []
  constructor(
    private cadastroService: CadastroService,
    private location: Location
  ) {
    this.dataSource = new MatTableDataSource<Funcao>([]);
  }

  ngOnInit(): void {
    this.cadastroService.buscarListaDeMinisterios().subscribe(
      (ministerios: Ministerio[]) => {
        this.ministerios = ministerios
      }
    )

    this.buscarListaDefuncoes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buscarListaDefuncoes() {
    this.cadastroService.buscarListaDefuncoes().subscribe({
      next: (dados: Funcao[]) => {
        this.dataSource = new MatTableDataSource(dados); // Inicializa o MatTableDataSource aqui
        this.dataSource.paginator = this.paginator; // Configura o paginator
        console.log('funcoes', dados);
        console.log('dataSource.data', this.dataSource.data);
      }
    });
  }



  addFuncao() {
    if (this.ministerrioSelecionado && this.funcao.name && this.funcao.descricao) {
      this.funcao.ministerio = this.ministerrioSelecionado
      this.ministerio.nome = this.ministerrioSelecionado
      this.cadastroService.cadastrarFuncao(this.funcao);

      this.funcao = { name: '', ministerio: '', descricao: '' }
      window.alert('Função cadastrada')
    } else {
      window.alert('preencha todos os campos')
    }
  }

  voltar() {
    this.location.back()
  }

}
