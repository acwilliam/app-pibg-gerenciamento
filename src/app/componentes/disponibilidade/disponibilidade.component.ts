import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateBlockDialogComponent } from '../date-block-dialog/date-block-dialog.component';
import { CadastroService } from '../cadastro.service';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
interface DateBlock {
  startDate: string;
  endDate: string;
}

interface Vigencia {
  mes: string,
  ano: number;
}


export interface DisponibilidadeData {
  emailvoluntario: string;
  vigencia: Vigencia
  semanaDisponivel: Semana[];
  dateBlocks?: DateBlock[];
}


export interface PeriodoDia {
  id: number;
  name: string;
  ativo: boolean;
}

export interface Semana {
  id: number;
  name: string;
  ativo: boolean;
  periods: PeriodoDia[];
}

@Component({
  selector: 'app-disponibilidade',
  templateUrl: './disponibilidade.component.html',
  styleUrls: ['./disponibilidade.component.css']
})
export class DisponibilidadeComponent implements OnInit {
  disponibilidadeExiste?: boolean;
  dateBlocks: DateBlock[] = [];
  disponibilidadeData!: DisponibilidadeData;
  emailVoluntario: string = '';
  vigencia: Vigencia = {
    mes: '',
    ano: 0
  }

  constructor(
    private dialog: MatDialog,
    private cadastroService: CadastroService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.inicializarDisponibilidadeData();
    this.emailVoluntario = this.authService.currentUserValue?.email || ''
    this.obterVigencia();
  }
  inicializarDisponibilidadeData() {
    this.disponibilidadeData = {
      emailvoluntario: '',
      vigencia: {
        mes: '',
        ano: 0
      },
      semanaDisponivel: this.weekDays,
      dateBlocks: []
    }
  }

  addDateBlock() {
    const dialogRef = this.dialog.open(DateBlockDialogComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dateBlocks.push({
          startDate: result.startDate,
          endDate: result.endDate
        });

        // Ordena os bloqueios por data
        this.dateBlocks.sort((a, b) => {
          const dateA = this.parseDate(a.startDate);
          const dateB = this.parseDate(b.startDate);
          return dateA.getTime() - dateB.getTime();
        });
      }
    });
  }

  removeDateBlock(block: DateBlock) {
    const index = this.dateBlocks.indexOf(block);
    if (index > -1) {
      this.dateBlocks.splice(index, 1);
    }
  }

  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  excluirDisponibilidade() {
    this.cadastroService.buscarDisponibilidade(this.emailVoluntario, this.vigencia.ano, this.vigencia.mes)
      .subscribe(existe => {
        if (existe) {
          this.cadastroService.excluirDisponibilidade(this.emailVoluntario, this.vigencia.ano, this.vigencia.mes)
          .subscribe(resultado => {
            if (resultado) {
              window.alert(`Disponibilidade para o mês ${this.vigencia.mes} e ano ${this.vigencia.ano} excluída com sucesso`)
            }
          })
        } else {
          window.alert(`Só é possivel excluir a disponibilidade do mês vigente`)
        }
      });

  }

  saveToFirestore() {
    this.disponibilidadeData = {
      emailvoluntario: this.emailVoluntario,
      vigencia: this.vigencia,
      semanaDisponivel: this.weekDays,
      dateBlocks: this.dateBlocks
    }

    this.cadastroService.buscarDisponibilidade(this.emailVoluntario, this.vigencia.ano, this.vigencia.mes)
      .subscribe(existe => {
        if (!existe) {
          this.cadastroService.cadastrarConfiguracaoDisponibilidade(this.disponibilidadeData)
          window.alert(`Disponibilidade para o mês ${this.vigencia.mes} e ano ${this.vigencia.ano} cadastrada com sucesso`)
        } else {
          window.alert(`Não é possivel cadastrar disponibilidade para o mês ${this.vigencia.mes} e ano ${this.vigencia.ano} porquê já foi cadastrado.`)
        }
      });
  }

  weekDays: Semana[] = [
    {
      id: 0,
      name: 'Domingo',
      ativo: false,
      periods: [
        { id: 0, name: 'Dia inteiro', ativo: false },
        { id: 1, name: 'Manhã', ativo: false },
        { id: 2, name: 'Tarde', ativo: false },
        { id: 3, name: 'Noite', ativo: false }
      ]
    },
    {
      id: 1,
      name: 'Segunda',
      ativo: false,
      periods: [
        { id: 0, name: 'Dia inteiro', ativo: false },
        { id: 1, name: 'Manhã', ativo: false },
        { id: 2, name: 'Tarde', ativo: false },
        { id: 3, name: 'Noite', ativo: false }
      ]
    },
    {
      id: 2,
      name: 'Terca',
      ativo: false,
      periods: [
        { id: 0, name: 'Dia inteiro', ativo: false },
        { id: 1, name: 'Manhã', ativo: false },
        { id: 2, name: 'Tarde', ativo: false },
        { id: 3, name: 'Noite', ativo: false }
      ]
    },
    {
      id: 3,
      name: 'Quarta',
      ativo: false,
      periods: [
        { id: 0, name: 'Dia inteiro', ativo: false },
        { id: 1, name: 'Manhã', ativo: false },
        { id: 2, name: 'Tarde', ativo: false },
        { id: 3, name: 'Noite', ativo: false }
      ]
    },
    {
      id: 4,
      name: 'Quinta',
      ativo: false,
      periods: [
        { id: 0, name: 'Dia inteiro', ativo: false },
        { id: 1, name: 'Manhã', ativo: false },
        { id: 2, name: 'Tarde', ativo: false },
        { id: 3, name: 'Noite', ativo: false }
      ]
    },
    {
      id: 5,
      name: 'Sexta',
      ativo: false,
      periods: [
        { id: 0, name: 'Dia inteiro', ativo: false },
        { id: 1, name: 'Manhã', ativo: false },
        { id: 2, name: 'Tarde', ativo: false },
        { id: 3, name: 'Noite', ativo: false }
      ]
    },
    {
      id: 6,
      name: 'Sabado',
      ativo: false,
      periods: [
        { id: 0, name: 'Dia inteiro', ativo: false },
        { id: 1, name: 'Manhã', ativo: false },
        { id: 2, name: 'Tarde', ativo: false },
        { id: 3, name: 'Noite', ativo: false }
      ]
    },
  ];
  toggleDay(day: Semana): void {
    day.ativo = !day.ativo;

    if (day.ativo && !day.periods.some(period => period.ativo)) {
      day.periods[0].ativo = true;
    } else if (!day.ativo) {
      day.periods.forEach(period => period.ativo = false);
    }
  }

  togglePeriod(day: Semana, periodoSelecionado: PeriodoDia): void {
    if (periodoSelecionado.name === 'Dia inteiro') {
      day.periods.forEach(period => {
        period.ativo = period === periodoSelecionado ? !period.ativo : false;
      });
    } else {
      day.periods[0].ativo = false;
      periodoSelecionado.ativo = !periodoSelecionado.ativo;
    }

    day.ativo = day.periods.some(period => period.ativo);
  }

  obterVigencia() {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear()
    this.vigencia = {
      mes: meses[mesAtual],
      ano: anoAtual
    }
  }

  voltar() {
    this.location.back()
  }
}
