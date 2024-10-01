import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoIncrementIdGeradorService {

  gerarNumeroAleatorio(): number {
     let ret = Math.floor(Math.random() * (1000000 - 0 + 1)) + 0;
    console.log('numero aleatorio',ret)
    return ret
  }


}
