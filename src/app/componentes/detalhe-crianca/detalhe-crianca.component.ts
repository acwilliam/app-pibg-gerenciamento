import { Data } from '@angular/router';
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
import { Frequencia } from '../model/Frequencia';
@Component({
  selector: 'app-detalhe-crianca',
  templateUrl: './detalhe-crianca.component.html',
  styleUrls: ['./detalhe-crianca.component.css']
})
export class DetalheCriancaComponent implements OnInit {
   userAdmin: boolean = false;
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

   frequencia: Frequencia = {
    data: '',
    identificacao: ''
   }

   listaChekins: Frequencia[] = [];

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
                this.buscarListaDeCheckins(idCadastro);
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

  buscarListaDeCheckins(idCadastro: string) {
  this.service.buscarListaDeCheckins(idCadastro).subscribe(checkins => {
    this.listaChekins = checkins;
      console.log('Lista de check-ins:', this.listaChekins);
    });
  }

  realizarCheckin() {
    this.route.params.subscribe(params => {this.frequencia.identificacao = params['id']; });
    this.frequencia.data = this.formatDate();
    console.log('realizando chekin ', this.frequencia)
    this.service.cadastrarFrequencia(this.frequencia);
  }

  qrData: string = '';
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


  editarCadastro() {
    console.log('passou aqui')
  }

  formatDate(): string {
    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0');  // Dia com 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mês com 2 dígitos (Janeiro é 0)
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');  // Horas com 2 dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0');  // Minutos com 2 dígitos
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  validarUserAdmin() {
    return this.authService.isAdmin();
  }
}
