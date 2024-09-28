import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrcodeService } from '../qrcode.service';

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
  constructor(
    private route: ActivatedRoute,
    private qrcodeService: QrcodeService) {}

  ngOnInit() {
    const qrcodeData = this.route.snapshot.paramMap.get('qrcodeData');
    const asObject = JSON.parse(qrcodeData!)
    this.nome = asObject.nome
    this.idade = asObject.idade
    console.log('url:', asObject.url)
    console.log('nome:', asObject.nome)
    console.log('idade:', asObject.idade)
    this.qrcodeData = this.qrcodeService.generateQrcode(asObject.url);
  }
}
