// confirmacao-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>{{data.titulo}}</h2>
      <mat-dialog-content>
        <p>{{data.mensagem}}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancelar</button>
        <button mat-button [mat-dialog-close]="true" color="primary">Confirmar</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 16px;
      min-width: 300px;
    }

    h2 {
      margin: 0 0 16px 0;
      color: rgba(0, 0, 0, 0.87);
    }

    p {
      margin: 0 0 20px 0;
      color: rgba(0, 0, 0, 0.6);
    }

    mat-dialog-actions {
      margin-bottom: -8px;
      padding: 8px 0;
    }

    button {
      min-width: 88px;
      padding: 0 16px;
    }
  `]
})
export class ConfirmacaoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    titulo: string;
    mensagem: string;
  }) {}
}
