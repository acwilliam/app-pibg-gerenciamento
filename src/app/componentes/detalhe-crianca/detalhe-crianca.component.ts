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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidacaoChecksService } from '../services/validacao-checks.service';
import { StatusCheckinCheckout } from '../model/StatusCheckinCheckout';
@Component({
  selector: 'app-detalhe-crianca',
  templateUrl: './detalhe-crianca.component.html',
  styleUrls: ['./detalhe-crianca.component.css']
})
export class DetalheCriancaComponent implements OnInit {

  cadastroTemp: Cadastro = this.cadastroTemporario();
  status: StatusCheckinCheckout = this.construirObjeto();
  modoEdicao = false;
  idDacrianca: string = '';
  cadastro: Cadastro = this.criarCadastro();

  frequencia: Frequencia = {
    dataCheckin: '',
    identificacao: '',
    dataChekout: ''
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
    private pdfService: PdfService,
    private snackBar: MatSnackBar,
    private validacaoCheksSerice: ValidacaoChecksService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.idDacrianca = this.route.snapshot.paramMap.get('id') || '';
    this.buscarListaDeCheckins(id!);
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

  buscarListaDeCheckins(idCadastro: string) {
    this.service.buscarListaDeCheckins(idCadastro).subscribe(checkins => {
      this.listaChekins = checkins;
      this.status = this.validacaoCheksSerice.verificarCheckinHoje(this.listaChekins);
    });
  }

  realizarCheckin() {

    if (this.status.isChekin) {
      this.route.params.subscribe(params => { this.frequencia.identificacao = params['id']; });
      this.frequencia.dataCheckin = this.formatDate();
      this.frequencia.dataChekout = ''
      this.service.realizarCheckin(this.frequencia).subscribe(
        id => {
          if (id) {
            this.frequencia.idRegistroCheckout = id
            this.cadastro.Frequencia = this.frequencia
            this.service.atualizarCadastroCompleto(this.cadastro, this.idDacrianca)
            this.status.isChekin = false
            window.alert('Checkin Realizado com Sucesso')
          }
        }
      );
    } else {
      window.alert('Não é possivel realizar mais de um checkin na mesma data')
      window.location.reload()
    }
  }

  realizarCheckout() {
    if (this.status.isCheckout) {
      this.route.params.subscribe(params => { this.frequencia.identificacao = params['id']; });
      this.frequencia.dataChekout = this.formatDate();
      if (this.cadastro.Frequencia?.dataCheckin != undefined) {
        this.service.realizarCheckOut(this.frequencia);
        this.cadastro.Frequencia.dataChekout = this.frequencia.dataChekout
        this.service.atualizarCadastroCompleto(this.cadastro, this.idDacrianca)
        this.status.isCheckout = false
        window.alert('checkout Realizado com sucesso')
        window.location.reload()
      } else {
        window.alert('Não é possivel realizar checkout sem realizar checkin')
        window.location.reload()
      }
    }
  }

  qrData: string = '';
  gerarQrcode() {
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
      this.addPdf(pdf); // Chama a função com a lista de PDFs
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  addPdf(pdf: Blob): void {
    this.printService.addPdf(pdf)
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

  toggleEdicao() {
    if (this.modoEdicao) {
      this.salvarEdicao();
    } else {
      this.iniciarEdicao();
    }
  }


  cadastroTemporario(): Cadastro {
    return {
      nomeResponsavel: '',
      nomeCrianca: '',
      telefoneResponsavel: '',
      observacao: '',
      horario: '',
      identificador: 0,
      selecionado: false,
      dataNascimento: '',
      sexo: '',
      tipo: '',
      sobreNome: '',
      urlFoto: ''
    }
  }

  criarCadastro(): Cadastro {
    return {
      nomeResponsavel: '',
      nomeCrianca: '',
      telefoneResponsavel: '',
      observacao: '',
      horario: '',
      identificador: 0,
      selecionado: false,
      dataNascimento: '',
      sexo: '',
      tipo: '',
      sobreNome: '',
      urlFoto: ''
    }
  }
  iniciarEdicao() {
    // Cria uma cópia do objeto para edição
    this.cadastroTemp = { ...this.cadastro };
    this.modoEdicao = true;
  }

  cancelarEdicao() {
    this.modoEdicao = false;
    this.snackBar.open('Edição cancelada', 'Fechar', { duration: 3000 });
  }

  async salvarEdicao() {
    try {
      if (!this.validarDados()) {
        this.snackBar.open('Por favor, preencha todos os campos obrigatórios', 'Fechar', { duration: 3000 });
        return;
      }
      const convertDate = new Date(this.cadastroTemp.dataNascimento)
      const dataFormatada = convertDate.toLocaleDateString('pt-BR')
      this.cadastroTemp.dataNascimento = this.validacaoCheksSerice.formateOnlyDate(dataFormatada)
      await this.service.atualizarCadastroCompleto(this.cadastroTemp, this.idDacrianca);
      this.cadastro = { ...this.cadastroTemp };
      this.modoEdicao = false;
      this.snackBar.open('Cadastro atualizado com sucesso!', 'Fechar', { duration: 3000 });
    } catch (error) {
      console.error('Erro ao atualizar cadastro:', error);
      this.snackBar.open('Erro ao atualizar cadastro', 'Fechar', { duration: 3000 });
    }
  }

  validarDados(): boolean {
    return !!(
      this.cadastroTemp.nomeCrianca &&
      this.cadastroTemp.nomeResponsavel &&
      this.cadastroTemp.telefoneResponsavel &&
      this.cadastroTemp.dataNascimento &&
      this.cadastroTemp.sexo &&
      this.cadastroTemp.tipo
    );
  }

  construirObjeto(): StatusCheckinCheckout {
    return {
      isChekin: false,
      isCheckout: false
    }
  }

}
