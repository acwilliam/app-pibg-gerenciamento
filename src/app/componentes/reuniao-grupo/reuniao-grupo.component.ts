import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CriarReunioesGrupoComponent } from '../../modais/criar-reunioes-grupo/criar-reunioes-grupo.component';
import { MatDialog } from '@angular/material/dialog';

Chart.register(...registerables);

interface Reuniao {
  data: Date;
  participantes: number;
  visitantes: number;
}
@Component({
  selector: 'app-reuniao-grupo',
  templateUrl: './reuniao-grupo.component.html',
  styleUrl: './reuniao-grupo.component.css'
})
export class ReuniaoGrupoComponent implements AfterViewInit {
  reunioes: Reuniao[] = [
    { data: new Date(2025, 2, 15), participantes: 3, visitantes: 2 },
    { data: new Date(2025, 2, 28), participantes: 5, visitantes: 2 },
    { data: new Date(2025, 3, 16), participantes: 7, visitantes: 4 },
    { data: new Date(2025, 3, 30), participantes: 5, visitantes: 1 }
  ];

  ngAfterViewInit() {
    this.criarGrafico();
  }

  constructor(public dialog: MatDialog) {}

  criarGrafico() {
    const ctx = document.getElementById('graficoReunioes') as HTMLCanvasElement;
    const labels = this.reunioes.map(reuniao => reuniao.data.toLocaleDateString());
    const participantes = this.reunioes.map(reuniao => reuniao.participantes);
    const visitantes = this.reunioes.map(reuniao => reuniao.visitantes);
    const total = this.reunioes.map(reuniao => reuniao.participantes + reuniao.visitantes);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Participantes',
            data: participantes,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: true
          },
          {
            label: 'Visitantes',
            data: visitantes,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            fill: true
          },
          {
            label: 'Total',
            data: total,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  abrirModalAdicionarReuniao(): void {
    const dialogRef = this.dialog.open(CriarReunioesGrupoComponent, {
      width: '600px',
      data: {
        reuniao: {
          data: new Date(),
          assunto: '',
          valorTotal: 0,
          anotacoes: '',
        },
        participantes: [
          { nome: 'sabrina Carvalho', presente: false },
          { nome: 'william coelho', presente: false },
        ], // Substitua pelos dados reais dos participantes
        visitantes: [],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('O modal foi fechado', result);
      // Aqui você pode adicionar a lógica para salvar a reunião
    });
  }
}
