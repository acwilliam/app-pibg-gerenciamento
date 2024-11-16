import { Component } from '@angular/core';
import { Reuniao } from '../model/reuniao';
import { Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { response } from 'express';
import { Evento } from '../model/Evento';

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrl: './reunioes.component.css'
})
export class ReunioesComponent {
  evento: Evento = {
    id: '',
    nome: ''
  }
  reuniao: Reuniao = {
    descricao: '',
    data: '',
    inicio: '',
    termino: '',
    faixaEtaria: '',
    evento: this.evento,
    numeroCrianca: 0,
    incluiAberta: false,
    repetirSemanalmente: false,
    quantidadeReunioes: 0,
    reuniaoFechada: false
  }

  reunioes: Reuniao[] = [
    this.reuniao
  ]

  abaAtiva: string = 'aberta';

  constructor(
    private router: Router,
    private cadastroService: CadastroService
  ) { }

  ngOnInit(): void {
    this.cadastroService.buscarReunioes().subscribe(
      response => {
        if (response) {
          this.reunioes = response;
        }
      }
    )
  }

  selecionarAba(aba: string) {
    this.abaAtiva = aba;
  }

  voltar() {
    this.router.navigate(['/pagina-principal'])
  }

  get reunioesAbertas(): Reuniao[] {
    return this.reunioes.filter(reuniao => reuniao.incluiAberta);
  }

  get reunioesPrevista(): Reuniao[] {
    return this.reunioes.filter(reuniao => !reuniao.incluiAberta);
  }

  get reunioesFechadas(): Reuniao[] {
    return this.reunioes.filter(reuniao => reuniao.reuniaoFechada);
  }
}
