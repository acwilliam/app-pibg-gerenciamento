import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class CriarContaService {

  constructor(private afAuth: AngularFireAuth) { }

  signup(email: string, password: string) {
    try {
      this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Usuário criado com sucesso');
    } catch (error) {
      throw new Error('Erro ao criar usuário');
    }
  }
}
