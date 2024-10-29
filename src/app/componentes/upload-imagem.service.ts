import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { catchError, finalize, from, Observable, switchMap, throwError, timer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadImagemService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadFoto(file: File, path: string, nomeCrianca: string): Observable<string> {
    const fileName = new Date().getTime() + '_' + nomeCrianca;
    const filePath = `${path}/${fileName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return from(task).pipe(
      switchMap(() => timer(2000)), // Espera 2 segundos
      switchMap(() => from(fileRef.getDownloadURL())),
      catchError((error) => {
        console.error('Erro ao obter URL:', error);
        return throwError(error);
      })
    );
  }
}
