import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrcodeService } from '../qrcode.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.css'
})
export class QrcodeComponent {
  qrcodeData: any;
  qrData: string = '';
  nome: string = '';
  idade: Number = 0;
  id:Number=0;
  constructor(
    private route: ActivatedRoute,
    private qrcodeService: QrcodeService,
    private location: Location
  ) {}

  ngOnInit() {
    const qrcodeData = this.route.snapshot.paramMap.get('qrcodeData');
    const asObject = JSON.parse(qrcodeData!)
    this.nome = asObject.nome
    this.idade = asObject.idade
    this.id = asObject.id
    console.log('url:', asObject.url)
    console.log('nome:', asObject.nome)
    console.log('idade:', asObject.idade)
    console.log('id:', asObject.id)
    this.qrcodeData = this.qrcodeService.generateQrcode(asObject.url);
  }

  printContent() {
    console.log('Imprimindo...');

  const contentToKeep = document.getElementById('contentToKeep');
  const printSection = document.getElementById('printSection');

  if (contentToKeep && printSection) {
    // Salva o estado original
    const originalDisplay = contentToKeep.style.display;
    const originalPosition = contentToKeep.style.position;
    const originalZIndex = contentToKeep.style.zIndex;

    // Ajusta o estilo para impressão
    contentToKeep.style.display = 'block';
    contentToKeep.style.position = 'fixed';
    contentToKeep.style.left = '0';
    contentToKeep.style.top = '0';
    contentToKeep.style.width = '100%';
    contentToKeep.style.height = '100%';
    contentToKeep.style.zIndex = '9999';

    window.print();

    // Restaura o estado original
    contentToKeep.style.display = originalDisplay;
    contentToKeep.style.position = originalPosition;
    contentToKeep.style.zIndex = originalZIndex;
  } else {
    console.error('Elementos necessários não encontrados');
  }
  }
  voltar() {
    this.location.back();
  }
}
