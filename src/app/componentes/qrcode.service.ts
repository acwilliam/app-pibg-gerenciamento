import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor() { }


  generateQrcode(data: string) {
    return {
      value: data,
      options: {
        width: 100,
        height: 100,
        colorDark: '#000',
        colorLight: '#fff',
        quietZone: 1,
      },
    };
  }

}
