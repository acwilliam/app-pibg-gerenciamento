import { CacularIdadeService } from './../cacular-idade.service';
import { Cadastro } from './../Cadastro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalhe-crianca',
  templateUrl: './detalhe-crianca.component.html',
  styleUrls: ['./detalhe-crianca.component.css']
})
export class DetalheCriancaComponent implements OnInit {
   cadastro: Cadastro = {
    nomeResponsavel: '',
    nomeCrianca: '' ,
    telefoneResponsavel: '',
    observacao: '',
    horario: '',
    identificador: 0,
    selecionado: false,
    dataNascimento: '',
    sexo:'',
    tipo:'',
    sobreNome: '',
    urlFoto: ''
   }


  constructor(
    private route: ActivatedRoute,
    private service: CadastroService,
    private router: Router,
    private caculaIdadeService: CacularIdadeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obterDetalhesCrianca(id!);
  }

  obterDetalhesCrianca(idCadastro: string): void {
    console.log(idCadastro)
    this.service.buscarCadastroPorId(idCadastro).subscribe(response => {
      if (response) {
        this.caculaIdadeService.calcularIdade(response)
        this.cadastro = response;
      } else {
        console.error('Cadastro não encontrado');
      }

    });
  }

  atualizarItem() {
    this.route.params.subscribe(params => {
      this.cadastro.identificador = params['id'];
      console.log('parametro',params['id'])
    });
    console.log('atualiando cadastro ', this.cadastro.identificador)
      this.service.atualizarCadastro(this.cadastro.identificador)
  }
  qrData: string = '';

  gerarQrcode() {
    console.log('cadastro para impressão', this.cadastro)
    const id = this.route.snapshot.paramMap.get('id');
    const qrcodeData = JSON.stringify({
        nome: this.cadastro.nomeCrianca,
        url: `https://app-pibg-gerenciamento.vercel.app/detalhe-crianca/${id}`,
        idade: this.cadastro.idade,
        id: id,
        identificado : this.cadastro.identificador
    })
    this.router.navigate(['/qrcode', qrcodeData]);
  }
  getUserImage() {
    return this.cadastro.urlFoto
  }


  voltar() {
    this.location.back();
  }
}
