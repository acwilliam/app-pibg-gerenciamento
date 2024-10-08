import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class CriarContaService {

  constructor(private afAuth: AngularFireAuth) { }

  async signup(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Usuário criado com sucesso:', userCredential.user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }
}
