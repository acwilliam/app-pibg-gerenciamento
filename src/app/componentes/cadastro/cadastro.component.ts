import { Component } from '@angular/core';
import { Cadastro } from '../Cadastro';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { AutoIncrementIdGeradorService } from '../auto-increment-id-gerador.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastros: Cadastro[]=[];
  constructor(
    private router: Router,
    private service: CadastroService,
    private geradorId: AutoIncrementIdGeradorService
  ){  }

  ngOnInit(): void {
  }

  cadastro: Cadastro = {
    nomeResponsavel:  '',
    nomeCrianca:  '',
    telefoneResponsavel:  '',
    observacao:  '',
    horario: this.formatDate(),
    identificador: 0,
    selecionado: true,
    dataNascimento: '',
    sexo:'',
    tipo:'',
    sobreNome: ''
  }

  cadastrar() {
    this.cadastro.identificador = this.geradorId.gerarNumeroAleatorio()
    console.log('###novo cadastros##', this.cadastro.identificador)
    this.service.cadastrarCrianca(this.cadastro)
    this.router.navigate(['/lista-crianca'])


  }

  cancelar() {
    this.router.navigate(['/lista-crianca'])

  }

  formatDate(): string {
    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0');  // Dia com 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mês com 2 dígitos (Janeiro é 0)
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');  // Horas com 2 dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0');  // Minutos com 2 dígitos
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
