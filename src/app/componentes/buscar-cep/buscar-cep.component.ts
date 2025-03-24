import { Component } from '@angular/core';
import { BuscarCepService } from '../services/buscar-cep.service';
import { Cep } from '../model/cep';
import { DadoUsuario } from '../model/dadoUsuario';

@Component({
  selector: 'app-buscar-cep',
  templateUrl: './buscar-cep.component.html',
  styleUrl: './buscar-cep.component.css'
})
export class BuscarCepComponent {
cancelar() {
throw new Error('Method not implemented.');
}

  dadoUsuario: DadoUsuario = {
    email: '',
    cep:'',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: '',
    pais: 'Brasil'
  }
  isLoading: any;
  cep: string = '';
  dadosCep: Cep = {
    cep:'',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: '',
    pais: 'Brasil'
  }

  constructor(private buscarCepService: BuscarCepService) {}


  onCepInput() {
    if (this.cep.length === 8) {
      this.buscarCep();
    }
  }

  buscarCep() {
      this.buscarCepService.buscar(this.cep).subscribe(
        (dados) => {
          this.dadosCep = dados;
          this.dadoUsuario.cep = this.dadosCep.cep;
          this.dadoUsuario.logradouro = this.dadosCep.logradouro;
          this.dadoUsuario.bairro = this.dadosCep.bairro;
          this.dadoUsuario.localidade = this.dadosCep.localidade;
          this.dadoUsuario.uf = this.dadosCep.uf;
          this.dadoUsuario.estado = this.dadosCep.estado;
          this.dadoUsuario.numero = this.dadosCep.numero;
          this.dadosCep.pais = 'Brasil';

          console.log("dados local", this.dadosCep);
        },
        (erro) => {
          console.error('Erro ao buscar CEP:', erro);
        }
      );
  }

  cadastrar() {

        console.log(this.dadoUsuario)

  }
}
