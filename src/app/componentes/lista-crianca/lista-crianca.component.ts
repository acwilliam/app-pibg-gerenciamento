import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Cadastro } from '../Cadastro';
import { CadastroService } from '../cadastro.service';
import { MatPaginator } from '@angular/material/paginator';
import { ValidacaoChecksService } from '../services/validacao-checks.service';
import { StatusCheckinCheckout } from '../model/StatusCheckinCheckout';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-crianca',
  templateUrl:'./lista-crianca.component.html',
  styleUrl: './lista-crianca.component.css'
})
export class ListaCriancaComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['nomeCrianca', 'nomeResponsavel', 'telefoneResponsavel', 'selecionado','chekout'];
  dataSource: MatTableDataSource<Cadastro>;

   statusCheckinCheckout: StatusCheckinCheckout = {
    isCheckout: false,
    isChekin: false,
   }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cadastroService: CadastroService,
    private validacaoCheksSerice: ValidacaoChecksService,
    private location: Location
  ) {
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
        this.processarDados(dados)
        this.dataSource.data = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar cadastros:', erro);
      }
    });
  }
  processarDados(dados: Cadastro[]) {
    dados.forEach(dado => {
      if (dado) {
        if (dado.Frequencia != undefined && this.validacaoCheksSerice.isDataCheckoutPreenchida(dado.Frequencia?.dataCheckin)) {
          this.statusCheckinCheckout = this.validacaoCheksSerice.validarCheckinCheckout(dado.Frequencia)
          console.log('validando status de checkin e checkout', this.statusCheckinCheckout)
          dado.selecionado = this.statusCheckinCheckout.isChekin
          dado.selecionadoOut = this.statusCheckinCheckout.isCheckout
          //TODO ATUALIZADO O DADO DE SELECIONADO E SELECIONADOOUT NO FIREBASE
        }
      }
    });
  }

  voltar() {
    this.location.back()
  }
}
