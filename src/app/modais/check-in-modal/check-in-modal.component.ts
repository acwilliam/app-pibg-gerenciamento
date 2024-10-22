import { of } from 'rxjs';
import { PrintService } from './../../componentes/print.service';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrcodeService } from '../../componentes/qrcode.service';
import { PdfService } from '../../componentes/pdf.service';

interface Child {
  id: number;
  nomeCrianca: string;
  urlFoto: string;
  selecionado: string;
  url?: string;
  dataNascimento?: string;
}

@Component({
  selector: 'app-check-in-modal',
  templateUrl: './check-in-modal.component.html',
  styleUrl: './check-in-modal.component.css'
})
export class CheckInModalComponent {
  selectedChildId: number | null = null;
  showCamera: boolean = false;
  stream: MediaStream | null = null;
  qrResultString: string = '';
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  constructor(
    public dialogRef: MatDialogRef<CheckInModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { children: Child[] },
    private qrcodeService: QrcodeService,
    private pdfService: PdfService,
    private printService: PrintService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  async onConfirm(): Promise<void> {

    console.log('crianças selecionadas para checkin', this.data.children);

    try {
      const pdfs: Blob[] = []; // Cria uma lista para armazenar os PDFs

      for (const crianca of this.data.children) {
        const url = `https://app-pibg-gerenciamento.vercel.app/detalhe-crianca/${crianca.id}`;
        const qrCode = await this.qrcodeService.generateQrCodeAsimage(url);
        const pdf = this.pdfService.generatePdf(qrCode, crianca.nomeCrianca, 10);
        console.log('PDF generated successfully');
        pdfs.push(pdf); // Adiciona o PDF gerado à lista
      }

      this.addPdfToQueue(pdfs); // Chama a função com a lista de PDFs

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  hasSelectedChildren(): boolean {
    return this.data.children.some(child => child.selecionado);
  }

  updateSelectedChildren(child: any) {
    console.log('criança selecionada', child.nomeCrianca)
    child.selected = !child.selected;
  }

  addPdfToQueue(pdfs: Blob[]): void {

    console.log('Enviando pdf para impressora');
    this.printService.addPdfToQueue(pdfs)
  }
}
