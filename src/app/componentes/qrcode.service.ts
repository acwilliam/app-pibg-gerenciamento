import { Injectable } from '@angular/core';
import jsQR from 'jsqr';
import QRCode from 'qrcode';

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

  async generateQrCodeAsimage(data: string): Promise<string> {
    console.log('imagem a ser gerada', data);
    const imageData = await QRCode.toDataURL(data, { type: 'image/png' });
    // Extract base64-encoded data from the dataURL
    console.log('qrcode', imageData)
    const base64Data = imageData.split(',')[1];
    return base64Data;
  }
}
