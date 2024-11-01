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
    // Regra 1: Se a lista estiver vazia, ambos são verdadeiros
    if (!listaChekins || listaChekins.length === 0) {
      return {
        isCheckout: true,
        isChekin: true
      };
    }

    // Regra 2: Verifica a lista de check-ins
    for (const checkin of listaChekins) {
      const dataHoje = this.dataHojeToISOString;
      const dataCheckin = this.formateOnlyDate(checkin.dataCheckin);
      const dataCheckout = this.formateOnlyDate(checkin.dataChekout);
      const convertdataHoje = new Date(dataHoje).toLocaleDateString('pt-BR');
      // Se encontrar um check-in com a data de hoje, marca como falso
      if (dataCheckin === convertdataHoje) {
        this.status.isChekin = false;
      }

      // Se encontrar um checkout com a data de hoje, marca como falso
      if (dataCheckout === this.formateOnlyDate(convertdataHoje)) {
        this.status.isCheckout = false;
      } else {
        this.status.isCheckout = true;
      }
    }

    return this.status;
  }

  validarCheckinCheckout(Check: Frequencia): StatusCheckinCheckout {
    const dataHoje = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const dataCheckin = this.formateDate(this.stringToDate(Check.dataCheckin));
    const dataCheckout = this.formateDate(this.stringToDate(Check.dataChekout));
    if (dataCheckin === dataHoje) {
      this.status.isChekin = true;
    } else {
      this.status.isChekin = false;
    }

    if (dataCheckout === dataHoje) {
      this.status.isCheckout = true;
    } else {
      this.status.isCheckout = false;
    }

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
  formateDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  stringToDate(dateString: string): Date {
    const [day, month, year, hour, minute] = dateString.split(/[/\s:]+/).map(Number);
    return new Date(year, month - 1, day, hour, minute);
  }

}
