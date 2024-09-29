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
  termoBusca: string = ''
  mostrarModal = false;
  criancaEncontrada: any;

  constructor(
    private cadastroService: CadastroService
  ) {}
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

  filtrarCriancas() {
     console.log('crianca buscada 1',this.termoBusca)
     this.cadastroService.buscarCadastroByName(this.termoBusca)
      .pipe(
      )
      .subscribe(crianca => {
        this.criancaEncontrada = crianca;
        this.mostrarModal = !!crianca;
        console.log('crianca buscada 2',this.criancaEncontrada)
      });
  }

}
