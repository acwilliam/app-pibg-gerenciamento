import { Injectable } from '@angular/core';
import moment from 'moment';
import { Cadastro } from './Cadastro';

@Injectable({
  providedIn: 'root'
})
export class CacularIdadeService {

  constructor() { }

  calcularIdade(cadastro: Cadastro): void {
    console.log('data',cadastro.dataNascimento)
    const hoje = moment();
    const dataNasc = moment(cadastro.dataNascimento, 'YYYY/MM/DD'); // Ajustar o formato da data se necessário

    if (!dataNasc.isValid()) {
        throw new Error('Data de nascimento inválida');
    }

    cadastro.idade = hoje.diff(dataNasc, 'years');

  }
}
