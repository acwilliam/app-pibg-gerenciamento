import { UploadImagemService } from './../upload-imagem.service';
import { Component } from '@angular/core';
import { Cadastro } from '../Cadastro';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { AutoIncrementIdGeradorService } from '../auto-increment-id-gerador.service';
import { Location } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, mergeMap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  fileSelecionado: boolean= false;
  cadastros: Cadastro[]=[];
  selectedFile: File | null = null;
  form: FormGroup;
  constructor(
    private router: Router,
    private service: CadastroService,
    private geradorId: AutoIncrementIdGeradorService,
    private route: ActivatedRoute,
    private location: Location,
    private uploadImagemService: UploadImagemService,
    private spinner: NgxSpinnerService
  ){
    this.form = new FormGroup({
      nomeResponsavel: new FormControl('', [Validators.required]),
      nomeCrianca: new FormControl('', [Validators.required]),
      sobreNomeCrianca: new FormControl('', [Validators.required]),
      telefoneResponsavel: new FormControl('', [Validators.required]),
      nascimento: new FormControl('', [Validators.required]),
      observacao: new FormControl('',[Validators.required]),
      sexo: new FormControl('',[Validators.required]),
      tipo: new FormControl('',[Validators.required]),
      selectedFile: new FormControl('',[Validators.required])
    });
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cadastro.emailResponsavel = params.get('email') || '';
    });
  }

  cadastro: Cadastro = {
    nomeResponsavel:  '',
    nomeCrianca:  '',
    telefoneResponsavel:  '',
    observacao:  '',
    horario: this.formatDate(),
    identificador: 0,
    selecionado: true,
    dataNascimento: '',
    sexo:'',
    tipo:'',
    sobreNome: '',
    emailResponsavel: '',
    urlFoto: ''
  }

  cadastrar() {
    this.spinner.show();

    this.cadastro.identificador = this.geradorId.gerarNumeroAleatorio();

    if (this.selectedFile) {
      const path = 'pibg-foto-perfil-bucket';
      this.uploadImagemService.uploadFoto(this.selectedFile, path).pipe(
        mergeMap(downloadURL => {
          this.cadastro.urlFoto = downloadURL;
          return this.service.cadastrarCrianca(this.cadastro);
        }),
        finalize(() => {
          this.spinner.hide()
        })
      ).subscribe(
        () => {
          console.log('Cadastro concluído com sucesso');
          this.location.back();
        },
        (error) => {
          console.error('Erro no cadastro:', error);
        }
      );
    } else {
      this.service.cadastrarCrianca(this.cadastro)
          this.location.back()
    }
  }
  cancelar() {
    this.location.back();
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
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && allowedTypes.includes(file.type))  
   {
      // O arquivo é uma imagem válida
      this.selectedFile = file;
      this.fileSelecionado = true
    } else {
      // Exibir uma mensagem de erro para o usuário
      alert('Por favor, selecione um arquivo de imagem válido.');
    }
  }

  onUpload() {
    if (this.selectedFile) {
      const path = 'pibg-foto-perfil-bucket';
      this.uploadImagemService.uploadFoto(this.selectedFile, path).subscribe(
        (downloadURL) => {
          console.log('URL da foto:', downloadURL);
          // Aqui você pode salvar a URL no seu objeto de cadastro ou no banco de dados
          this.cadastro.urlFoto = downloadURL
        },
        (error) => {
          console.error('Erro no upload:', error);
        }
      );
    }
  }
}
