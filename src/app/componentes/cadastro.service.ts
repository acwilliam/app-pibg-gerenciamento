import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cadastro } from './Cadastro';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { Frequencia } from './model/Frequencia';
import { DisponibilidadeData } from './disponibilidade/disponibilidade.component';
import { Funcao, Ministerio } from './roles/roles.component';
import { Reuniao } from './model/reuniao';
import { Categoria } from './model/categoriaGrupo';
import { Grupo } from './model/grupo';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {



  constructor(
    private firestore: AngularFirestore
  ) { }

  cadastrarGrupo(grupo: Grupo) {
    const cadastroCollection = this.firestore.collection<Grupo>('grupo_teia');
    return cadastroCollection.add(grupo);
  }

  atualizarCaterogiaGrupo(categoria: Categoria) {
    console.log('atualizado categoria')
   return this.firestore.collection('categoria_grupo').doc(categoria.id).update(categoria)
   .then(()=> {
    console.log('atualizado com sucesso')
   })
   .catch((error) =>{
    console.error('Erro ao atualizar categoria:', error);
   });
  }
  excluirCategoriaGrupo(categoria: Categoria) {
    this.firestore.collection('categoria_grupo').doc(categoria.id).delete()
      .then(() => {
        console.log('Categoria excluída com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao excluir categoria:', error);
      });
  }

  getCategorias(): Observable<Categoria[]> {
    return this.firestore.collection<Categoria>('categoria_grupo')
      .valueChanges({ idField: 'id' });
  }

  criarCategoriaGrupo(novaCategoria: Categoria) {
    const cadastroCollection = this.firestore.collection<Categoria>('categoria_grupo');
    return cadastroCollection.add(novaCategoria);
  }


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

  cadastrarFuncao(funcao: Funcao) {
    const cadastroCollection = this.firestore.collection<Funcao>('funcao');
    return cadastroCollection.add(funcao);
  }

  cadastrarMinisterio(ministerio: Ministerio) {
    const cadastroCollection = this.firestore.collection<Ministerio>('ministerio');
    return cadastroCollection.add(ministerio);
  }

  buscarListaDeMinisterios(): Observable<Ministerio[]> {
    return this.firestore.collection<Ministerio>('ministerio')
      .valueChanges({ idField: 'id' });
  }

  buscarListaDefuncoes(): Observable<Funcao[]> {
    return this.firestore.collection<Funcao>('funcao')
      .valueChanges({ idField: 'id' });
  }


  criarReuniao(reuniao: Reuniao) {
    console.log('reuniao')
    const cadastroCollection = this.firestore.collection<Reuniao>('reuniao');
    return cadastroCollection.add(reuniao)
  }

  buscarReunioes() {
    console.log('reuniao')
    return this.firestore.collection<Reuniao>('reuniao')
      .valueChanges({ idField: 'id' });
  }

  excluirReunioes(reunioesSelecionadas: number[]): Observable<any> {
    const delecao = reunioesSelecionadas.map((reu) => {
      const ref = this.firestore.collection('reuniao').doc(reu.toString());
      return ref.delete();
    });

    return forkJoin(delecao);
  }

  abrirReunioes(reunioesSelecionadas: number[]): Observable<any> {
    const updates = reunioesSelecionadas.map((reu) => {
      const ref = this.firestore.collection('reuniao').doc(reu.toString());
      return ref.update({ incluiAberta: true });
    });

    return forkJoin(updates);
  }

  fecharReunioes(reunioesSelecionadasParaFechar: number[]) {
    const updates = reunioesSelecionadasParaFechar.map((reu) => {
      const ref = this.firestore.collection('reuniao').doc(reu.toString());
      return ref.update({
        reuniaoFechada: true,
        incluiAberta: false
      });
    });

    return forkJoin(updates);
  }

  buscarReuniao(id: string): Observable<any> {
    console.log('passou aqui')
    return this.firestore.doc<Reuniao>(`reuniao/${id}`).valueChanges();
  }

  buscarSalas(): Observable<any[]> {
    return this.firestore.collection('sala').valueChanges({ idField: 'id' });
  }

}
