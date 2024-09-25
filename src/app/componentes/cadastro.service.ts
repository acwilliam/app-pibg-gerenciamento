import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cadastro } from './Cadastro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  cadastrarCrianca(cadastro: Cadastro) {
    // Usando a API Compat para adicionar documentos
    const cadastroCollection = this.firestore.collection<Cadastro>('cadastro');
    return cadastroCollection.add(cadastro);
  }
  // Método para buscar cadastros
  buscarCadastro(): Observable<Cadastro[]> {
    // Usando a API Compat para buscar documentos
    return this.firestore.collection<Cadastro>('cadastro').valueChanges({ idField: 'id' });
  }
}
