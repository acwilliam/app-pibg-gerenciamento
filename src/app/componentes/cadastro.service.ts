import { Inject, Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Cadastro } from './Cadastro';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(
    private firestore: Firestore
  ) { }

  cadastrarCrianca(cadastro: Cadastro) {
    console.log('erro')
      const cadastroCollection = collection(this.firestore, 'cadastro')
      return  addDoc(cadastroCollection, cadastro )
  }
}
