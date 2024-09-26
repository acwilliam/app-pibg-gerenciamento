import { Component } from '@angular/core';
import { Mensagem } from './Mensagem';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.css'
})
export class MensagemComponent {


  mensagem: Mensagem = {
    msg : "Olá! Gostaria de entrar em contato sobre...",
    numero: "+5511959035714"
  }

  enviarMensagem() {
    const link = `https://wa.me/${this.mensagem.numero}?text=${encodeURIComponent(this.mensagem.msg)}`;
    window.open(link, '_blank');
  }
}
