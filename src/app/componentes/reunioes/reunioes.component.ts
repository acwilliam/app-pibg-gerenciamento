import { Component } from '@angular/core';
import { Reuniao } from '../model/reuniao';
import { Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { response } from 'express';
import { Evento } from '../model/Evento';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacaoDialogComponent } from '../../shared/dialogs/confirmacao-dialog/confirmacao-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrl: './reunioes.component.css'
})
export class ReunioesComponent {
  modoSelecao: boolean = false;
  reunioesSelecionadas: number[] = [];
  modoSelecaoFechar = false;
  reunioesSelecionadasParaFechar: number[] = []; // array para guardar IDs das reuniões
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
    private cadastroService: CadastroService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
      this.carregarReunioes()
  }

  ativarModoSelecaoFechar() {
    this.modoSelecaoFechar = true;
  }

  ativarModoSelecao(reuniao: any) {
    this.modoSelecao = true;
    // Já seleciona a reunião clicada
    if (!this.reunioesSelecionadas.includes(reuniao.id)) {
      this.reunioesSelecionadas.push(reuniao.id);
    }
  }

  toggleSelecao(event: any, reuniao: any) {
    const index = this.reunioesSelecionadas.indexOf(reuniao.id);
    if (index === -1) {
      this.reunioesSelecionadas.push(reuniao.id);
    } else {
      this.reunioesSelecionadas.splice(index, 1);
    }

    // Se não houver mais itens selecionados, desativa o modo seleção
    if (this.reunioesSelecionadas.length === 0) {
      this.modoSelecao = false;
    }
  }

  toggleSelecaoFechar(event: MatCheckboxChange, reuniao: any) {
    if (event.checked) {
      this.reunioesSelecionadasParaFechar.push(reuniao.id);
    } else {
      this.reunioesSelecionadasParaFechar = this.reunioesSelecionadasParaFechar.filter(id => id !== reuniao.id);
    }
  }

  fecharReunioes() {
    this.cadastroService.fecharReunioes(this.reunioesSelecionadasParaFechar).subscribe(
      () => {
        this.carregarReunioes();
        this.modoSelecaoFechar = false;
        this.reunioesSelecionadasParaFechar = [];
      },
      error => {
        console.error('Erro ao fechar reuniões:', error);
      }
    );
  }
  cancelarSelecao() {
      this.modoSelecao = false;
      this.reunioesSelecionadas = [];
  }

  excluirReunioes() {
      const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
        data: {
          titulo: 'Confirmar exclusão',
          mensagem: 'Deseja realmente excluir as reuniões selecionadas?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cadastroService.excluirReunioes(this.reunioesSelecionadas).subscribe({
            next: () => {
              this.snackBar.open('Reuniões excluídas com sucesso', 'Fechar', {
                duration: 3000
              });
              this.reunioesSelecionadas = [];
              this.modoSelecao = false;
              this.carregarReunioes();
            },
            error: () => {
              this.snackBar.open('Erro ao excluir reuniões', 'Fechar', {
                duration: 3000
              });
            }
          });
        }
      });
  }

  abrirReunioes() {
      const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
        data: {
          titulo: 'Confirmar abertura',
          mensagem: 'Deseja realmente abrir as reuniões selecionadas?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cadastroService.abrirReunioes(this.reunioesSelecionadas).subscribe({
            next: () => {
              this.snackBar.open('Reuniões abertas com sucesso', 'Fechar', {
                duration: 3000
              });
              this.reunioesSelecionadas = [];
              this.modoSelecao = false;
              this.carregarReunioes();
            },
            error: () => {
              this.snackBar.open('Erro ao abrir reuniões', 'Fechar', {
                duration: 3000
              });
            }
          });
        }
      });
  }

  carregarReunioes() {
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
    this.modoSelecao = false;
    this.reunioesSelecionadas = [];
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

  navegarParaDetalhesSala(reuniao: any) {
    console.log('passou aqui')
    this.router.navigate(['/sala', reuniao.id]);
  }
}
