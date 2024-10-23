import { Injectable } from '@angular/core';

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
