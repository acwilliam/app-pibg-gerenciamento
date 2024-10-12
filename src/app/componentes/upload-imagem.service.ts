import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, switchMap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadImagemService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadFoto(file: File, path: string): Observable<string> {
    const fileName = new Date().getTime() + '_' + file.name;
    const filePath = `${path}/${fileName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.snapshotChanges().pipe(
        finalize(() => {
            console.log('Upload concluído:', filePath);
        }),
        switchMap(() => {
            // Adicionar um atraso para garantir a sincronização
            return new Promise(resolve => setTimeout(resolve, 1000));
        }),
        switchMap(() => fileRef.getDownloadURL()),
        catchError((error) => {
            console.error('Erro ao obter URL:', error);
            if (error.code === 'storage/object-not-found') {
                console.error('Objeto não encontrado:', filePath);
            }
            return throwError(error);
        })
    );
}

}
