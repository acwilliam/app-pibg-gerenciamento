import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrcodeService } from '../qrcode.service';
import { NgxPrintService, PrintOptions } from 'ngx-print';

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
    private printService: NgxPrintService
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
    const printOptions: PrintOptions = {
      printDelay: 100,
      printSectionId: 'printSection',
      printTitle: 'teste',
      useExistingCss: true,
      bodyClass: 'impresso',
      openNewTab: false,
      previewOnly: false,
      closeWindow: false
    };
    this.printService.print(printOptions);
  }
}
