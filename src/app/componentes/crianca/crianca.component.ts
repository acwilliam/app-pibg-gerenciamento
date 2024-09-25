import { Cadastro } from './../Cadastro';
import { Component } from '@angular/core';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-crianca',
  templateUrl: './crianca.component.html',
  styleUrl: './crianca.component.css'
})
export class CriancaComponent {
  listaCrianca: Cadastro[] = []
  constructor(private cadastroService: CadastroService) {}

  ngOnInit(): void {
    this.buscarCadastros();
  }

  buscarCadastros(): void {
    this.cadastroService.buscarCadastro().subscribe((dados: Cadastro[]) => {
      this.listaCrianca = dados;
      console.log('Cadastros encontrados:', this.listaCrianca);
    }, (erro) => {
      console.error('Erro ao buscar cadastros:', erro);
    });
  }

  atualizarItem(idCadastro: Number) {
    console.log('atualiando cadastro ', idCadastro)
      this.cadastroService.atualizarCadastro(idCadastro)
  }
}
