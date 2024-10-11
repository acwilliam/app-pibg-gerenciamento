import { Component } from '@angular/core';
import { Mensagem } from './Mensagem';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.css'
})
export class MensagemComponent {
  telefoneResponsavel: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.telefoneResponsavel = params['telefoneResponsavel'];
      console.log('parametro',params['telefoneResponsavel'])
    });
  }
  mensagem: Mensagem = {
    msg : "Olá! Gostaria de entrar em contato sobre...",
    numero: `+55${this.telefoneResponsavel}`
  }

  enviarMensagem() {
    const link = `https://wa.me/+55${this.telefoneResponsavel}?text=${encodeURIComponent(this.mensagem.msg)}`;
    window.open(link, '_blank');
  }

  voltar() {
    this.location.back();
  }
}
