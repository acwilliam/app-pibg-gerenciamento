import { CacularIdadeService } from './../cacular-idade.service';
import { Cadastro } from './../Cadastro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { PrintService } from '../print.service';
import { QrcodeService } from '../qrcode.service';
import { PdfService } from '../pdf.service';
@Component({
  selector: 'app-detalhe-crianca',
  templateUrl: './detalhe-crianca.component.html',
  styleUrls: ['./detalhe-crianca.component.css']
})
export class DetalheCriancaComponent implements OnInit {
    canEdit: boolean = false;
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
    private location: Location,
    private authService: AuthService,
    private printService: PrintService,
    private qrcodeService: QrcodeService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obterDetalhesCrianca(id!);
  }


  obterDetalhesCrianca(idCadastro: string): void {
    this.service.buscarCadastroPorId(idCadastro).subscribe(
        response => {
            if (response) {
                this.cadastro = response;
                this.caculaIdadeService.calcularIdade(this.cadastro)
                const emailUsuarioLogado = this.cadastro.emailResponsavel!;

                if (!(this.authService.isAdmin() || this.authService.isResponsible(emailUsuarioLogado))) {
                  alert('Você não tem permissão para ver os dados dessa criança.');
                  this.router.navigate(['/usuario-kids']);
                  return;
              }
            } else {
                console.error('Cadastro não encontrado');
                this.router.navigate(['/usuario-kids']);
            }
        },
        error => {
            console.error('Erro ao buscar cadastro', error);
            this.router.navigate(['/']);
        }
    );
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

  /*gerarQrcode() {
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
  }*/

    gerarQrcode() {
      console.log('cadastro para impressão', this.cadastro)
      const id = this.route.snapshot.paramMap.get('id');
      this.onConfirm(id!)

    }

  getUserImage() {
    return this.cadastro.urlFoto
  }


  voltar() {
    this.location.back();
  }

  async onConfirm(id: string): Promise<void> {
    try {

        const url = `https://app-pibg-gerenciamento.vercel.app/detalhe-crianca/${id}`;
        const qrCode = await this.qrcodeService.generateQrCodeAsimage(url);
        const pdf = await this.pdfService.generatePdf(qrCode, this.cadastro.nomeCrianca, this.cadastro.idade!);
        console.log('PDF generated successfully');
        this.addPdf(pdf); // Chama a função com a lista de PDFs
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  addPdf(pdf: Blob): void {

    console.log('Enviando pdf para impressora');
    this.printService.addPdf(pdf)
  }
}
