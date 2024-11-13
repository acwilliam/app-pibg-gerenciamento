import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cadastro } from './Cadastro';
import { from, map, Observable, switchMap } from 'rxjs';
import { Frequencia } from './model/Frequencia';
import { DisponibilidadeData } from './disponibilidade/disponibilidade.component';

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
    console.log('id', idCadastro)
    return this.firestore.collection<Cadastro>('cadastro').doc(idCadastro).valueChanges();
  }


  buscarCadastrosByEmail(email: string): Observable<Cadastro[]> {
    return this.firestore.collection<Cadastro>('cadastro', ref => ref.where('emailResponsavel', '==', email))
      .valueChanges({ idField: 'id' });
  }

  realizarCheckin(frequencia: Frequencia): Observable<string> {
    const cadastroCollection = this.firestore.collection<Frequencia>('checkin');
    return from(cadastroCollection.add(frequencia)).pipe(map(docRef => docRef.id));
  }

  realizarCheckOut(frequencia: Frequencia) {
    this.firestore
      .doc(`checkin/${frequencia.idRegistroCheckout}`)
      .update(frequencia)
      .then(() => {
        console.log('Checkout atualizado com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao atualizar Checkout:', error);
        throw error;
      });
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

  cadastrarConfiguracaoDisponibilidade(disponibilidadeData: DisponibilidadeData) {

    const cadastroCollection = this.firestore.collection<DisponibilidadeData>('disponibilidadeData');
    return cadastroCollection.add(disponibilidadeData);
  }

  buscarDisponibilidade(emailVoluntario: string, ano: number, mes: string): Observable<boolean> {
    console.log('passou aqui')
    return this.firestore.collection<DisponibilidadeData>('disponibilidadeData', ref =>
      ref.where('emailvoluntario', '==', emailVoluntario)
        .where('vigencia.ano', '==', ano)
        .where('vigencia.mes', '==', mes)
    ).get().pipe(
      map(snapshot => {
        console.log('snapshot size', snapshot.size)
        return !snapshot.empty
      }))
  }

  excluirDisponibilidade(emailVoluntario: string, ano: number, mes: string) {
    return from(this.firestore.collection('disponibilidadeData', ref =>
      ref.where('emailvoluntario', '==', emailVoluntario)
        .where('vigencia.ano', '==', ano)
        .where('vigencia.mes', '==', mes))
      .get())
      .pipe(
        switchMap(snapshot => {
          if (snapshot.empty) {
            return [false];
          }
          const batch = this.firestore.firestore.batch();
          snapshot.docs.forEach(doc => batch.delete(doc.ref));
          return from(batch.commit()).pipe(map(() => true));
        }));
  }
}
