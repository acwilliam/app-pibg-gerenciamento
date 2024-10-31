import { Injectable } from '@angular/core';
import { Frequencia } from '../model/Frequencia';
import { StatusCheckinCheckout } from '../model/StatusCheckinCheckout'
@Injectable({
  providedIn: 'root'
})
export class ValidacaoChecksService {
  hoje: Date = new Date();
  dataHojeToISOString = this.hoje.toISOString().split('T')[0];
  status: StatusCheckinCheckout ={
    isChekin: false,
    isCheckout: false
  }
  constructor() { }


  verificarCheckinHoje(listaChekins: Frequencia[]): StatusCheckinCheckout {

    const checkinHoje = listaChekins.some((checkin) => {
      if (this.isDataCheckoutPreenchida(checkin.dataChekout)) {
        console.log('chekout 1')
        this.status.isCheckout = checkin.dataChekout === this.dataHojeToISOString
      } else {
        console.log('chekout 2')
        this.status.isCheckout = true
      }
      return this.formateOnlyDate(checkin.dataCheking) === this.dataHojeToISOString;
    });
    this.status.isChekin = !checkinHoje || listaChekins.length === 0;

    return this.status;
  }

  isDataCheckoutPreenchida(dataCheckout: string | null | undefined): boolean {
    return dataCheckout !== null && dataCheckout !== undefined && dataCheckout.trim().length > 0;
  }

  formateOnlyDate(data: String) {
    const date = data.substring(0, 10);
    const [dia, mes, ano] = date.split('/');

    return `${ano}-${mes}-${dia}`;
  }
}
