import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface Grupo {
  nome: string;
  pessoas: number;
  lideranca: string;
  imagemTopo: string;
  imagemPerfil: string;
}
@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrl: './lista-grupos.component.css'
})
export class ListaGruposComponent  implements OnInit {
  grupos: Grupo[] = [
    {
      nome: 'teia 1',
      pessoas: 2,
      lideranca: 'Liderança',
      imagemTopo: 'assets/teia1-topo.jpg',
      imagemPerfil: 'assets/teia1-perfil.jpg'
    },
    {
      nome: 'teia 2',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 3',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 4',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 5',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 3',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 4',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 5',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 3',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 4',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    {
      nome: 'teia 5',
      pessoas: 0,
      lideranca: 'Liderança',
      imagemTopo: 'assets/tetetete-topo.jpg',
      imagemPerfil: 'assets/tetetete-perfil.jpg'
    },
    // ... (mais grupos) ...
  ];
  pageSize = 10;
  currentPage = 1;
  totalItems = this.grupos.length;
  totalPages = Math.ceil(this.totalItems / this.pageSize);
  gruposPagina: Grupo[] = [];
  filtros = {
      categorias: [
        { nome: 'cadastro', selecionado: false },
        { nome: 'Familias', selecionado: false },
        { nome: 'Casais', selecionado: false },
        { nome: 'Adultos', selecionado: false },
        { nome: 'Jovens', selecionado: false },
        { nome: 'Adolescentes', selecionado: false },
        { nome: 'Crianças', selecionado: false }
      ],
      sexo: [
        { nome: 'Masculino', selecionado: false },
        { nome: 'Feminino', selecionado: false },
        { nome: 'Ambos', selecionado: false }
      ],
      diaSemana: [
        { nome: 'domingo', selecionado: false },
        { nome: 'segunda-feira', selecionado: false },
        { nome: 'terça-feira', selecionado: false },
        { nome: 'quarta-feira', selecionado: false },
        { nome: 'quinta-feira', selecionado: false },
        { nome: 'sexta-feira', selecionado: false },
        { nome: 'sábado', selecionado: false }
      ],
      horario: [
        { nome: 'Manhã', selecionado: false },
        { nome: 'Tarde', selecionado: false },
        { nome: 'Noite', selecionado: false }
      ]
    };

    constructor() { }

    ngOnInit(): void {
      this.updateGruposPagina();
    }

    filtrarGrupos() {
      // Aqui você implementaria a lógica para filtrar os grupos
      // com base nos filtros selecionados.
      console.log('Filtrando grupos...');
    }
    updateGruposPagina() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.gruposPagina = this.grupos.slice(startIndex, endIndex);
    }

    changePageSize() {
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.updateGruposPagina();
    }

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateGruposPagina();
      }
    }

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updateGruposPagina();
      }
    }

    goToFirstPage() {
      this.currentPage = 1;
      this.updateGruposPagina();
    }

    goToLastPage() {
      this.currentPage = this.totalPages;
      this.updateGruposPagina();
    }

    getPageInfo() {
      const startItem = (this.currentPage - 1) * this.pageSize + 1;
      const endItem = Math.min(this.currentPage * this.pageSize, this.totalItems);
      return `${startItem} - ${endItem} of ${this.totalItems}`;
    }


}
