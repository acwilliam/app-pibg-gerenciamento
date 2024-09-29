import { Component } from '@angular/core';
import { Cadastro } from '../Cadastro';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastros: Cadastro[]=[];
  constructor(
    private router: Router,
    private service: CadastroService,
    private route: ActivatedRoute
  ){  }

  ngOnInit(): void {
    this.service.buscarCadastro().subscribe(cadastros =>{
      this.cadastros = cadastros;
    })
    const id = this.route.snapshot.paramMap.get('id') || uuidv4();
    this.cadastro.id = id;
    console.log('teste', this.cadastro.id)
  }

  cadastro: Cadastro = {
    nomeResponsavel:  '',
    nomeCrianca:  '',
    telefoneResponsavel:  '',
    observacao:  '',
    horario: this.formatDate(),
    id: '',
    selecionado: true,
    dataNascimento: '',
    sexo:'',
    tipo:''
  }

  cadastrar() {
    console.log('Dados a serem cadastrados:', {
      nomeResponsavel: this.cadastro.nomeResponsavel,
      nomeCrianca: this.cadastro.nomeCrianca,
      telefoneResponsavel: this.cadastro.telefoneResponsavel,
      observacao: this.cadastro.observacao,
      id: this.cadastro.id,
      ti: this.cadastro.tipo
    });

    this.service.cadastrarCrianca(this.cadastro)
    this.router.navigate(['/listaCrianca'])


  }

  cancelar() {
    this.router.navigate(['/listaCrianca'])

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
}
