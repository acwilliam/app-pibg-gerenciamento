import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pessoa } from './Pessoa';
import { first, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  cadastrarPessoa(pessoa: Pessoa) {
    pessoa.nome.toLocaleLowerCase()
    pessoa.sobrenome.toLocaleLowerCase().trim()
    pessoa.email.toLocaleLowerCase().trim()
    const cadastroCollection = this.firestore.collection<Pessoa>('pessoa');
    return cadastroCollection.add(pessoa);
  }

  buscarCadastroByEmail(email: string): Observable<Pessoa | undefined> {
    return this.firestore.collection<Pessoa>('pessoa', ref => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        first(),
        map((pessoas: Pessoa[]) => pessoas.length > 0 ? pessoas[0] : undefined)
      );
  }

}
