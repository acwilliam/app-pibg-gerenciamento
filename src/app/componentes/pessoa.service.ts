import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from './Pessoa';
import { first, from, map, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  cadastrarPessoa(pessoa: Pessoa) {
    pessoa.nome.toLocaleLowerCase()
    pessoa.sobrenome.toLocaleLowerCase().trim()
    pessoa.email.toLocaleLowerCase().trim()
    const cadastroCollection = this.firestore.collection<Pessoa>('pessoa');
    return cadastroCollection.add(pessoa);
  }

  buscarCadastro(): Observable<Pessoa[]> {
    return this.firestore.collection<Pessoa>('pessoa')
      .valueChanges({ idField: 'id' });
  }



  buscarCadastroPorId(idCadastro: string): Observable<Pessoa | undefined> {
    console.log('id',idCadastro)
    return this.firestore.collection<Pessoa>('cadastro').doc(idCadastro).valueChanges();
  }

  buscarCadastroByEmail(email: string): Observable<Pessoa | undefined> {
    return this.firestore.collection<Pessoa>('pessoa', ref => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        first(),
        map((cadastros: Pessoa[]) => cadastros.length > 0 ? cadastros[0] : undefined)
      );
  }

  atualizarCadastroPorNome(nomeCrianca: string): Observable<void> {
    return this.firestore.collection('cadastro', ref => ref.where('nomeCrianca', '==', nomeCrianca))
    .get()
      .pipe(
        switchMap(snapshot => {
          if (snapshot.empty) {
            throw new Error('Nenhum cadastro encontrado com este nome');
          }
          const doc = snapshot.docs[0];
          return from(doc.ref.update({ selecionado: true }));
        })
      );
  }

}
