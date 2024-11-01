import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cadastro } from './Cadastro';
import { from, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Frequencia } from './model/Frequencia';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(
    private firestore: AngularFirestore
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

  buscarCadastroPorId(idCadastro: string): Observable<Cadastro | undefined> {
    console.log('id',idCadastro)
    return this.firestore.collection<Cadastro>('cadastro').doc(idCadastro).valueChanges();
  }


  buscarCadastrosByEmail(email: string): Observable<Cadastro[]> {
    return this.firestore.collection<Cadastro>('cadastro', ref => ref.where('emailResponsavel', '==', email))
      .valueChanges({ idField: 'id' });
  }

  realizarCheckin(frequencia: Frequencia) {
    const cadastroCollection = this.firestore.collection<Frequencia>('checkin');
    return cadastroCollection.add(frequencia);
  }

  realizarCheckOut(frequencia: Frequencia): Observable<void> {
    return this.firestore.collection('checkin', ref => ref.where('identificacao', '==', frequencia.identificacao))
    .get()
      .pipe(
        switchMap(snapshot => {
          if (snapshot.empty) {
            throw new Error('Nenhum registro de checkin encontrado');
          }
          const doc = snapshot.docs[0];
          return from(doc.ref.update({ dataChekout: frequencia.dataChekout }));
        })
      );
  }

  buscarListaDeCheckins(idCadastro: string): Observable<Frequencia[]> {
    return this.firestore.collection<Frequencia>('checkin', ref => ref.where('identificacao', '==', idCadastro))
    .valueChanges({ idField: 'id' });
  }

  buscarUltimoCheckin(idCadastro: string): Observable<Frequencia> {
    return this.firestore.collection<Frequencia>('checkin', ref =>
      ref
        .where('identificacao', '==', idCadastro)
        .orderBy('dataCheckin', 'desc')
        .limit(1)
    ).valueChanges({ idField: 'id' }).pipe(map(res => res[0]));
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
