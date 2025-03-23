import { PrintService } from './../../componentes/print.service';
import { Component, ElementRef, Inject, NgZone, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrcodeService } from '../../componentes/qrcode.service';
import { PdfService } from '../../componentes/pdf.service';
import jsQR from 'jsqr';

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
    private printService: PrintService,
    private ngZone: NgZone
  ) {}

  onCancel(): void {
    this.stopCamera();
    this.dialogRef.close();
  }

  async onConfirm(): Promise<void> {

    const selectedChildrenIds = this.data.children
    .filter(child => child.selecionado)
    .map(child => child.id);
    console.log('crianças selecionadas para checkin', selectedChildrenIds);

    if (!this.showCamera) {
      await this.openCamera();
    } else {
      this.stopCamera();
      this.dialogRef.close({ selectedChildrenIds, qrCode: this.qrResultString });
    }

    try {
      const pdfs: Blob[] = []; // Cria uma lista para armazenar os PDFs

      for (const crianca of this.data.children) {
        const url = `https://app-pibg-gerenciamento.vercel.app/detalhe-crianca/${crianca.id}`;
        const qrCode = await this.qrcodeService.generateQrCodeAsimage(url);
        const pdf = await this.pdfService.generatePdf(qrCode, crianca.nomeCrianca, 10);
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

  async openCamera(): Promise<void> {
    try {
      const constraints = {
        video: {
          facingMode: { exact: "environment" }
        }
      };
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.nativeElement.srcObject = this.stream;
      this.showCamera = true;
      this.videoElement.nativeElement.play();
      requestAnimationFrame(() => this.tick());
    } catch (err) {
      console.error('Erro ao abrir a câmera:', err);
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.videoElement.nativeElement.srcObject = this.stream;
        this.showCamera = true;
        this.videoElement.nativeElement.play();
        requestAnimationFrame(() => this.tick());
      } catch (fallbackErr) {
        console.error('Erro ao abrir qualquer câmera:', fallbackErr);
      }
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.showCamera = false;
  }

  tick() {
    if (this.videoElement.nativeElement.readyState === this.videoElement.nativeElement.HAVE_ENOUGH_DATA) {
      this.canvasElement.nativeElement.height = this.videoElement.nativeElement.videoHeight;
      this.canvasElement.nativeElement.width = this.videoElement.nativeElement.videoWidth;
      const context = this.canvasElement.nativeElement.getContext('2d');
      if (context) {
        context.drawImage(this.videoElement.nativeElement, 0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
        const imageData = context.getImageData(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          this.ngZone.run(() => {
            this.qrResultString = code.data;
            console.log('QR Code detectado:', this.qrResultString);
            // Você pode adicionar lógica adicional aqui, como fechar o modal ou processar o código QR
          });
        }
      }
    }
    if (this.showCamera) {
      requestAnimationFrame(() => this.tick());
    }
  }
}
