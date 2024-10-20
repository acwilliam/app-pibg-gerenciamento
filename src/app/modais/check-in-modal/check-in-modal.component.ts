import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


interface Child {
  id: number;
  nomeCrianca: string;
  urlFoto: string;
  selecionado: string
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
  @ViewChild('videoElement') videoElement!: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<CheckInModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { children: Child[] }
  ) {}

  onCancel(): void {
    this.stopCamera()
    this.dialogRef.close();
  }

  onConfirm(): void {

    const selectedChildrenIds = this.data.children
    .filter(child => child.selecionado)
    .map(child => child.id);

    console.log('crianças selecionadas para checkin',selectedChildrenIds);
    if (!this.showCamera) {
      this.openCamera();
    } else {
      this.capturePhoto();
      this.stopCamera();
      this.dialogRef.close(selectedChildrenIds);
    }
  }

  hasSelectedChildren(): boolean {
    return this.data.children.some(child => child.selecionado);
  }

  updateSelectedChildren(child: any) {
    console.log('criança selecionada', child.nomeCrianca)
    child.selected = !child.selected;
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
    } catch (err) {
      console.error('Erro ao abrir a câmera:', err);
      // Se falhar ao abrir a câmera traseira, tente abrir qualquer câmera disponível
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.videoElement.nativeElement.srcObject = this.stream;
        this.showCamera = true;
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

  capturePhoto(): void {
    // Implementar a lógica para capturar a foto
    console.log('Foto capturada');
  }
}
