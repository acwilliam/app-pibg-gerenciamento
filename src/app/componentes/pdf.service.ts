import { QrcodeService } from './qrcode.service';
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private qrcodeService : QrcodeService) { }



  generatePdf1(qrCode: string, nome: string, idade: Number): Blob {
    const pageWidth = 55; // 5cm em mm
    const pageHeight = 31; // 3cm em mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pageWidth, pageHeight]
    });

    //const pdf = new jsPDF('landscape');
    const qrCodeX = 2; // Posição x do QR Code
    const qrCodeY = 1; // Posição y do QR Code
    const qrCodeWidth = 27; // Largura do QR Code
    const qrCodeHeight = 27; // Altura do QR Code
    pdf.setFontSize(9)
    pdf.addImage(qrCode, 'PNG', qrCodeX, qrCodeY, qrCodeWidth, qrCodeHeight);

    const textX = qrCodeX + qrCodeWidth ; // Posição x do texto (à direita do QR Code com espaçamento de 10)
    const textY = qrCodeHeight - 18; // Posição y do texto (centralizado verticalmente em relação ao QR Code)

    pdf.text(nome + ', ' + idade + ' Anos', textX, textY);


    return pdf.output('blob');
  }

  generatePdf(qrCode: string, nome: string, idade: Number): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const pageWidth = 55; // 5cm em mm
        const pageHeight = 31; // 3cm em mm
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [pageWidth, pageHeight]
        });

        const qrCodeX = 2; // Posição x do QR Code
        const qrCodeY = 1; // Posição y do QR Code
        const qrCodeWidth = 27; // Largura do QR Code
        const qrCodeHeight = 27; // Altura do QR Code
        pdf.setFontSize(9);
        pdf.addImage(qrCode, 'PNG', qrCodeX, qrCodeY, qrCodeWidth, qrCodeHeight);

        const textX = qrCodeX + qrCodeWidth; // Posição x do texto
        const textY =  qrCodeHeight - 21

        pdf.text(nome + ', ' + idade + ' Anos', textX, textY);

        const logoImage = new Image();
        logoImage.src = 'LOGO.png'; // Ajustar o caminho da imagem
        logoImage.onload = () => {
            pdf.addImage(logoImage, 'PNG', qrCodeX + 26, qrCodeY+7 , 22, 19);
            resolve(pdf.output('blob')); // Resolve a promise com o blob do PDF
        };
        logoImage.onerror = (error) => {
            reject(error); // Reject a promise em caso de erro ao carregar a imagem
        };
    });
}


}
