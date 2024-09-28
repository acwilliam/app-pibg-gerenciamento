import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cadastro } from './Cadastro';
import { first, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  cadastrarCrianca(cadastro: Cadastro) {
    const cadastroCollection = this.firestore.collection<Cadastro>('cadastro');
    return cadastroCollection.add(cadastro);
  }
  buscarCadastro(): Observable<Cadastro[]> {
    return this.firestore.collection<Cadastro>('cadastro', ref => ref.where('selecionado', '==', true))
      .valueChanges({ idField: 'id' });
  }

  atualizarCadastro(id: string) {
    console.log('atualizando cadastro', id)
    const cadastroCollection = this.firestore.doc<Cadastro>(`cadastro/${id}`);
    return cadastroCollection.update({selecionado: false})
  }

  buscarCadastroPorId(idCadastro: string): Observable<Cadastro | undefined> {
    console.log('id',idCadastro)
    return this.firestore.collection<Cadastro>('cadastro').doc(idCadastro).valueChanges();
  }

  /*buscarCadastroByName(nomeCrianca: string): Observable<Cadastro | undefined> {
    console.log('buscando nome',nomeCrianca);
    return this.firestore.collection<Cadastro>('cadastro', ref => ref.where('nomeCrianca', '==', nomeCrianca))
      .valueChanges()
      .pipe(first());
  }*/
  buscarCadastroByName(nomeCrianca: string): Observable<Cadastro | undefined> {
    console.log('buscando nome', nomeCrianca);
    return this.firestore.collection<Cadastro>('cadastro', ref => ref.where('nomeCrianca', '==', nomeCrianca))
      .valueChanges()
      .pipe(
        first(), // Primeiro valor emitido (array de resultados)
        map((cadastros: Cadastro[]) => cadastros.length > 0 ? cadastros[0] : undefined) // Pega o primeiro cadastro ou undefined
      );
  }
}

