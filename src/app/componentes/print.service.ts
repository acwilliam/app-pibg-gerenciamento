import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import  Printer from 'pdf-to-printer';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  private printer: any;

  constructor() {
    if (typeof process !== 'undefined' && process.versions && process.versions.node) {
      import('pdf-to-printer').then(module => {
        this.printer = module.default;
      });
    }
  }

  addPdfToQueue(pdfs: Blob[]): void {
    pdfs.forEach(pdf => {  // Itera sobre a lista de PDFs
      const file = new File([pdf], 'document.pdf', { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(file);
      console.log('passou aqui para enviar para impressora');
      this.printUsingBrowser(fileUrl);
    });
  }
  addPdf(pdf: Blob): void {
      const file = new File([pdf], 'document.pdf', { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(file);
      console.log('passou aqui para enviar para impressora');
      this.printUsingBrowser(fileUrl);
  }
  private printUsingBrowser(fileUrl: string): void {
    const printWindow = window.open(fileUrl);

    if (printWindow) {
      printWindow.addEventListener('load', () => {
        // Imprimir somente após o carregamento completo do PDF
        printWindow.print();

        // Fechar a janela após a impressão
        //printWindow.close();
        URL.revokeObjectURL(fileUrl);
      });

      // Caso ocorra algum erro no carregamento, exibir uma mensagem e fechar a janela
      printWindow.addEventListener('error', () => {
        console.error('Erro ao carregar o PDF');
        alert('Erro ao carregar o PDF para impressão.');
        printWindow.close();
        URL.revokeObjectURL(fileUrl);
      });
    } else {
      // Lidar com o caso em que a janela não pode ser aberta (ex: bloqueadores de pop-up)
      console.error('Não foi possível abrir a janela de impressão.');
      alert('Não foi possível abrir a janela de impressão. Verifique se o bloqueador de pop-ups está habilitado.');
      URL.revokeObjectURL(fileUrl);
    }
  }

}
