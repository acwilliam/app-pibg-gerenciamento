import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor() { }


  generateQrcode(data: string) {
    return {
      value: data
    };
  }

}
