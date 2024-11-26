import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-detalhe-sala',
  templateUrl: './detalhe-sala.component.html',
  styleUrl: './detalhe-sala.component.css'
})
export class DetalheSalaComponent implements OnInit {
  sala: any;
  criancas: any[] = [];
  totalCriancas: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cadastroservice: CadastroService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.carregarDetalhesSala(id);
  }

  carregarDetalhesSala(id: string) {
    this.cadastroservice.buscarReuniao(id).subscribe(
      (dados) => {
        this.sala = dados;
        console.log('sala', this.sala)
      //  this.criancas = dados.criancas;
        this.totalCriancas = this.criancas.length;
      }
    );
  }

  fecharSala() {
    // Implementar lógica para fechar a sala
  }

  checkInSala() {
    // Implementar lógica para check-in
  }
}
