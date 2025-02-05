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
        const pageWidth = 29;
        const pageHeight = 90;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [pageWidth, pageHeight]
        });

        // Ajuste da posição e tamanho do QR Code
        const qrCodeX = 1;
        const qrCodeY = 1;
        const qrCodeWidth = 30;
        const qrCodeHeight = 30;

        pdf.addImage(qrCode, 'PNG', qrCodeX, qrCodeY, qrCodeWidth, qrCodeHeight);

        // Formatação do texto
        pdf.setFont('Arial', 'normal'); // Define a fonte
        pdf.setFontSize(12); // Define o tamanho da fonte

        // Ajuste da posição do texto
        const textX = qrCodeX + qrCodeWidth - 8;
        const textY = qrCodeY + qrCodeHeight / 2 + 13; // Centralizado verticalmente

        pdf.text(nome + ', ' + idade + ' Anos', textX, textY,
          { align: 'left', angle: -90 });

        const logoImage = new Image();
        logoImage.src = 'LOGO.png';
        logoImage.onload = () => {
            // Ajuste da posição e tamanho do logo
            const logoX = qrCodeX ;
            const logoY = qrCodeY + qrCodeHeight + 20;
            const logoWidth = 20;
            const logoHeight = 35;

            pdf.addImage(logoImage, 'PNG', logoX, logoY, logoWidth, logoHeight);
            resolve(pdf.output('blob'));
        };
        logoImage.onerror = (error) => {
            reject(error);
        };
    });
  }

}
