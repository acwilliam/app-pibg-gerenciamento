import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Cadastro } from '../Cadastro';
import { CadastroService } from '../cadastro.service';


@Component({
  selector: 'app-lista-crianca',
  templateUrl:'./lista-crianca.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: './lista-crianca.component.css'
})
export class ListaCriancaComponent {
  criancas: Cadastro[] = []
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;
  ELEMENT: Cadastro [] = [];
  constructor(
    private cadastroService: CadastroService
  ) { }
  ngOnInit(): void {
    this.buscarCadastros();
  }
  dataSource = new MatTableDataSource(this.ELEMENT);
  displayedColumns: string[] = ['nomeCrianca', 'telefoneResponsavel', 'nomeResponsavel'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filter value:', filterValue.trim().toLowerCase()); // Log for debugging

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  buscarCadastros(): void {
    this.cadastroService.buscarCadastro().subscribe((dados: Cadastro[]) => {
      this.criancas = dados;
      console.log('Cadastros encontrados:', this.criancas);
      this.dataSource = new MatTableDataSource(this.criancas);
    }, (erro) => {
      console.error('Erro ao buscar cadastros:', erro);
    });
  }
}
