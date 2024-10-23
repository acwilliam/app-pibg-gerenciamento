import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar
  ) {
    if (swUpdate.isEnabled) {
      swUpdate.versionUpdates.subscribe(() => {
        const snack = this.snackbar.open('Nova versão disponível', 'Atualizar', {
          duration: 6000
        });
        
        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }
}
