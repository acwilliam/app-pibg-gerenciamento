import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Participante } from '../../componentes/model/participante';

@Component({
  selector: 'app-criar-reunioes-grupo',
  templateUrl: './criar-reunioes-grupo.component.html',
  styleUrl: './criar-reunioes-grupo.component.css'
})
export class CriarReunioesGrupoComponent {


  reuniao: any;
  participantes: any[];
  visitantes: any[];
  criancas: any[];
  valorTotal: number = 0;
  constructor(
    public dialogRef: MatDialogRef<CriarReunioesGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reuniao = data.reuniao;
    this.participantes = data.participantes;
    this.visitantes = data.visitantes;
    this.criancas = data.criancas;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionarVisitante(): void {
    console.log('visitante',this.data.visitantes)
    this.data.visitantes.push({ nome: '' });
  }

  removerVisitante(visitante: any): void {
    const index = this.data.visitantes.indexOf(visitante);
    if (index >= 0) {
      this.data.visitantes.splice(index, 1);
    }
  }

  removerCrianca(crianca: any) {
    const index = this.data.criancas.indexOf(crianca);
    if (index >= 0) {
      this.data.criancas.splice(index, 1);
    }
  }

  adicionarCrianca() {
    console.log('visitante',this.data.criancas)
    this.data.criancas.push({ nome: '' });
  }

  salvarReuniao() {
    this.dialogRef.close({ reuniao: this.reuniao, participantes: this.participantes, visitantes: this.visitantes, criancas: this.criancas, valorTotal: this.valorTotal });

  }


  get totalPessoas(): number {
    this.valorTotal = this.calcularTotalPessoas();
    return this.valorTotal;
  }

  calcularTotalPessoas(): number {
    let totalParticipantes = this.data.participantes.filter((p: Participante) => p.presente).length;
    let totalVisitantes = this.data.visitantes.length;
    let totalCriancas = this.data.criancas.length;

    return totalParticipantes + totalVisitantes + totalCriancas;
  }

}
