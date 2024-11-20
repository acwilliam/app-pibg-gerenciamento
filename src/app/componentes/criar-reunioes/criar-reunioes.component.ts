import { Reuniao } from './../model/reuniao';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { Evento } from '../model/Evento';
import { forkJoin, from, Observable } from 'rxjs';

@Component({
  selector: 'app-criar-reunioes',
  templateUrl: './criar-reunioes.component.html',
  styleUrl: './criar-reunioes.component.css'
})
export class CriarReunioesComponent {
  reuniaoForm!: FormGroup;
  salas = ['Sala 0 a 4 Anos']; // Adicione mais salas conforme necessário
  eventos = ['Sem evento']; // Adicione mais eventos conforme necessário
  evento: Evento= {
    id: '',
    nome: ''
  }
  reuniao: Reuniao = {
    descricao: '',
    data: '',
    inicio: '',
    termino: '',
    faixaEtaria: '',
    evento: this.evento,
    numeroCrianca: 0,
    incluiAberta: false,
    repetirSemanalmente: false,
    quantidadeReunioes: 0,
    reuniaoFechada: false
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadastroService: CadastroService
  ) {}

  ngOnInit() {
    this.reuniaoForm = this.fb.group({
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      sala: ['', Validators.required],
      evento: ['', Validators.required],
      numeroMaximo: [0],
      incluiAberta: [false],
      repetirSemanalmente: [false],
      quantidadeReunioes: [{value: '', disabled: true}, [Validators.min(1), Validators.max(52)]]
    });

    // Observer para as mudanças no checkbox repetirSemanalmente
    this.reuniaoForm.get('repetirSemanalmente')?.valueChanges.subscribe(valor => {
      const quantidadeReunioesControl = this.reuniaoForm.get('quantidadeReunioes');
      if (valor) {
        quantidadeReunioesControl?.enable();
        quantidadeReunioesControl?.setValidators([Validators.required, Validators.min(1), Validators.max(52)]);
      } else {
        quantidadeReunioesControl?.disable();
        quantidadeReunioesControl?.clearValidators();
      }
      quantidadeReunioesControl?.updateValueAndValidity();
    });
  }

  voltar() {
    this.router.navigate(['/reunioes']);
  }


  criarReuniao() {
    if (this.reuniaoForm.valid) {
      this.reuniao = this.reuniaoForm.value;
      const quantidadeRepeticoes = this.reuniao.repetirSemanalmente ? this.reuniao.quantidadeReunioes : 1;
      const addReunioes:any[] = []
      this.reuniao.reuniaoFechada = false
      addReunioes.push(this.reuniao)
      for (let i =0; i < quantidadeRepeticoes; i++) {
        console.log('entrou aqui ', quantidadeRepeticoes)
        //clonando objeto
        const novaReuniao = { ...this.reuniao };
        if ( i> 0) {
          const dataOriginal = new Date(this.reuniaoForm.value.data);
        let novaData = new Date(dataOriginal);
        novaData.setDate(dataOriginal.getDate() + (7 * i));
        novaReuniao.data = novaData.toISOString().split('T')[0];
        addReunioes.push(novaReuniao);
        }
      }

      for (const reuniao of addReunioes) {
        this.cadastroService.criarReuniao(reuniao);
      }

      window.alert('reunioes cadastradas')
    }
  }


}
