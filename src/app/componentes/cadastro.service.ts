import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cadastro } from './Cadastro';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { Frequencia } from './model/Frequencia';
import { AvailabilityData, WeeklyAvailability } from './disponibilidade/disponibilidade.component';

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

  cadastrarConfiguracaoDisponibilidade(availabilityData: AvailabilityData) {

    const cadastroCollection = this.firestore.collection<AvailabilityData>('availabilityData');
    return cadastroCollection.add(availabilityData);
  }

}
