import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CriarReunioesGrupoComponent } from '../../modais/criar-reunioes-grupo/criar-reunioes-grupo.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ReuniaoGrupo } from '../model/reuniao-grupo';
import { CadastroService } from '../cadastro.service';
import { Participante } from '../model/participante';
import { Timestamp } from '@angular/fire/firestore';

Chart.register(...registerables);
@Component({
  selector: 'app-reuniao-grupo',
  templateUrl: './reuniao-grupo.component.html',
  styleUrl: './reuniao-grupo.component.css'
})
export class ReuniaoGrupoComponent implements AfterViewInit, OnInit {
  reunioes: ReuniaoGrupo[] = [ { data: new Date(2025, 2, 28), total_participante: 5, total_visitante: 2 } ];

  participantes: Participante[] = [];

  ngAfterViewInit() {
    this.criarGrafico();
  }

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private cadastroService: CadastroService){

    }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.buscarParticipantesDoGrupo(id!);
    this.buscarReunioesGrupoTeia(id!);
  }

  criarGrafico() {
    const ctx = document.getElementById('graficoReunioes') as HTMLCanvasElement;
    const labels = this.reunioes.map(reuniao => reuniao.data.toLocaleDateString());
    const participantes = this.reunioes.map(reuniao => reuniao.total_participante);
    const visitantes = this.reunioes.map(reuniao => reuniao.total_visitante);
    const total = this.reunioes.map(reuniao => reuniao.total_participante + reuniao.total_visitante + reuniao.total_crianca!);

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
      width: '700px',
      data: {
        reuniao: {
          data: new Date(),
          assunto: '',
          valorTotal: 0,
          relato_supervisao: '',
          observacao: '',
          idGrupo: this.route.snapshot.paramMap.get('id')
        },
        participantes:[ ...this.participantes ],
        visitantes: [],
        criancas:[]
      },
    });

    dialogRef.afterClosed().subscribe((result) => {

      console.log('O modal foi fechado', result);

      if (result) {
          const reuniao: ReuniaoGrupo = {
          assunto: result.reuniao.assunto,
          data: new Date(result.reuniao.data),
          id: result.reuniao.idGrupo,
          observacao: result.reuniao.observacao,
          relato_supervisao: result.reuniao.relato_supervisao,
          total_participante: result.valorTotal,
          total_visitante: result.visitantes.length,
          total_crianca: result.criancas.length,
          participantes: result.participantes as Participante[],
          visitantes: result.visitantes.map((visitante: { nome: any; }) => visitante.nome),
          criancas: result.criancas,
        };
        console.log('Objeto Reuniao pronto para salvar:', reuniao);
          this.cadastroService.cadastrarReuniaoGrupo(reuniao);
      }
    });
  }

  buscarParticipantesDoGrupo(id: string): void {
    this.cadastroService.buscarParticipantesDoGrupo(id).subscribe((response) => {
      this.participantes = response.map((participante: any) => {
        let nome = `${participante.nome} ${participante.sobrenome}`;
        return {nome: nome, presente: false };
      });
    });
  }

  buscarReunioesGrupoTeia(id: string) {
    this.cadastroService.buscarReunioesGrupoTeia(id).subscribe(
      (reunioes) => {
        if (reunioes) {
          const reunioesConvertidas = reunioes.map((reuniao) => {
            if (reuniao.data instanceof Timestamp) {
              return {
                ...reuniao,
                data: reuniao.data.toDate()
              };
            }
            return reuniao;
          });
          console.log('retorno', reunioesConvertidas);
          this.reunioes = reunioesConvertidas;
        }
      }
    );
  }

}
