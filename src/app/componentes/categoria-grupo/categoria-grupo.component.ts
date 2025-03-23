import { Component } from '@angular/core';
import { Categoria } from '../model/categoriaGrupo';
import { CadastroService } from '../cadastro.service';


@Component({
  selector: 'app-categoria-grupo',
  templateUrl: './categoria-grupo.component.html',
  styleUrl: './categoria-grupo.component.css'
})
export class CategoriaGrupoComponent {
  categoriaEmEdicao: any;

  categorias: Categoria[] = [
    {id: '', nome: '', grupos: 1, descricao: '' }
  ];

  constructor(private cadastroService: CadastroService) {
    this.cadastroService.getCategorias().subscribe(categorias => this.categorias = categorias);
  }

  novaCategoria: Categoria = { id: '', nome: '', grupos: 0, descricao: '' };

  criarCategoria() {
    this.cadastroService.criarCategoriaGrupo(this.novaCategoria);
  }

  editarCategoria(categoria: any) {
    this.categoriaEmEdicao = { ...categoria };
  }

  salvarEdicao() {
    const index = this.categorias.findIndex(c => c.id === this.categoriaEmEdicao.id);
    if (index !== -1) {
      this.categorias[index] = { ...this.categoriaEmEdicao };
      console.log(" atualizando", this.categorias[index])
      this.cadastroService.atualizarCaterogiaGrupo(this.categorias[index]);
    }
    this.categoriaEmEdicao = null;
  }

  cancelarEdicao() {
    this.categoriaEmEdicao = null;
  }

  excluirCategoria(categoria: any) {
    this.cadastroService.excluirCategoriaGrupo(categoria);

  }
}
