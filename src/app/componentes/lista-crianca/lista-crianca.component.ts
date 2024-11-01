import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Cadastro } from '../Cadastro';
import { CadastroService } from '../cadastro.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-lista-crianca',
  templateUrl:'./lista-crianca.component.html',
  styleUrl: './lista-crianca.component.css'
})
export class ListaCriancaComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['nomeCrianca', 'nomeResponsavel', 'telefoneResponsavel', 'selecionado','chekout'];
  dataSource: MatTableDataSource<Cadastro>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cadastroService: CadastroService) {
    this.dataSource = new MatTableDataSource<Cadastro>([]);
  }

  ngOnInit(): void {
    this.buscarCadastros();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscarCadastros(): void {
    this.cadastroService.buscarCadastro().subscribe({
      next: (dados: Cadastro[]) => {
        console.log('passando no cadastro da lista de crianca', dados)
        this.dataSource.data = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar cadastros:', erro);
      }
    });
  }
}
