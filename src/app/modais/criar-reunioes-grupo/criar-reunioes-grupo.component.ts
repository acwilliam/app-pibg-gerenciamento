import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-criar-reunioes-grupo',
  templateUrl: './criar-reunioes-grupo.component.html',
  styleUrl: './criar-reunioes-grupo.component.css'
})
export class CriarReunioesGrupoComponent {

  constructor(
    public dialogRef: MatDialogRef<CriarReunioesGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  adicionarVisitante(): void {
    this.data.visitantes.push({ nome: '' });
  }

  removerVisitante(visitante: any): void {
    const index = this.data.visitantes.indexOf(visitante);
    if (index >= 0) {
      this.data.visitantes.splice(index, 1);
    }
  }
}
