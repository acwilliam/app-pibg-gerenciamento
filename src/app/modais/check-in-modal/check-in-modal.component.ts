import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


interface Child {
  id: number;
  nomeCrianca: string;
  urlFoto: string;
  selecionado: string
}

@Component({
  selector: 'app-check-in-modal',
  templateUrl: './check-in-modal.component.html',
  styleUrl: './check-in-modal.component.css'
})
export class CheckInModalComponent {
  selectedChildId: number | null = null;
  constructor(
    public dialogRef: MatDialogRef<CheckInModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { children: Child[] }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {

    const selectedChildrenIds = this.data.children
    .filter(child => child.selecionado) // Filtra as crianças que estão selecionadas
    .map(child => child.id); // Mapeia para obter apenas os IDs
  // Faça algo com os IDs das crianças selecionadas
    console.log('crianças selecionadas para checkin',selectedChildrenIds);
    this.dialogRef.close(this.selectedChildId);
  }

  hasSelectedChildren(): boolean {
    return this.data.children.some(child => child.selecionado);
  }

  updateSelectedChildren(child: any) {
    console.log('criança selecionada', child.nomeCrianca)
    child.selected = !child.selected;
  }
}
