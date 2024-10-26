import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class CriarContaService {

  constructor(private afAuth: AngularFireAuth) { }

  signup(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Usuário criado com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro ao criar usuário');
      });
  }
}
