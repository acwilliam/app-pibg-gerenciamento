import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Cadastro } from './Cadastro';
import { first, from, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Frequencia } from './model/Frequencia';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  cadastrarCrianca(cadastro: Cadastro) {
    cadastro.sobreNome.toLocaleLowerCase()
    cadastro.nomeCrianca.toLocaleLowerCase().trim
    const cadastroCollection = this.firestore.collection<Cadastro>('cadastro');
    return cadastroCollection.add(cadastro);
  }

  buscarCadastro(): Observable<Cadastro[]> {
    return this.firestore.collection<Cadastro>('cadastro')
      .valueChanges({ idField: 'id' });
  }

  atualizarCadastro(id: Number) {
    const cadastroCollection = this.firestore.doc<Cadastro>(`cadastro/${id}`);
    return cadastroCollection.update({selecionado: false})
  }

  buscarCadastroPorId(idCadastro: string): Observable<Cadastro | undefined> {
    console.log('id',idCadastro)
    return this.firestore.collection<Cadastro>('cadastro').doc(idCadastro).valueChanges();
  }

  buscarCadastroByName(nomeCrianca: string): Observable<Cadastro | undefined> {
    console.log('buscando nome', nomeCrianca);
    return this.firestore.collection<Cadastro>('cadastro', ref => ref.where('nomeCrianca', '==', nomeCrianca))
      .valueChanges()
      .pipe(
        first(), // Primeiro valor emitido (array de resultados)
        map((cadastros: Cadastro[]) => cadastros.length > 0 ? cadastros[0] : undefined) // Pega o primeiro cadastro ou undefined
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

  buscarCadastrosByEmail(email: string): Observable<Cadastro[]> {
    return this.firestore.collection<Cadastro>('cadastro', ref => ref.where('emailResponsavel', '==', email))
      .valueChanges({ idField: 'id' });
  }

  cadastrarFrequencia(frequencia: Frequencia) {
    const cadastroCollection = this.firestore.collection<Frequencia>('checkin');
    return cadastroCollection.add(frequencia);
  }

  buscarListaDeCheckins(idCadastro: string): Observable<Frequencia[]> {
    return this.firestore.collection<Frequencia>('checkin', ref => ref.where('identificacao', '==', idCadastro))
    .valueChanges({ idField: 'id' });
  }

  atualizarCadastroCompleto(cadastro: Cadastro, idDacrianca: string): Promise<void> {
    return this.firestore
    .doc(`cadastro/${idDacrianca}`)
    .update(cadastro)
    .then(() => {
      console.log('Cadastro atualizado com sucesso');
    })
    .catch((error) => {
      console.error('Erro ao atualizar cadastro:', error);
      throw error;
    });
  }
}
