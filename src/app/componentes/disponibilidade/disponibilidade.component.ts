import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { DateBlockDialogComponent } from '../date-block-dialog/date-block-dialog.component';

interface DateBlock {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-disponibilidade',
  templateUrl: './disponibilidade.component.html',
  styleUrls: ['./disponibilidade.component.css']
})
export class DisponibilidadeComponent implements OnInit {
  weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  dateRange = new FormControl();
  showDateRangePicker = false;
  availabilityForm!: FormGroup;

  dateBlocks: DateBlock[] = [
    {
      startDate: '24/07/2024',
      endDate: '31/07/2024'
    },
    {
      startDate: '01/08/2024',
      endDate: '05/08/2024'
    }
  ];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.availabilityForm = this.fb.group({
      domingo: [false], // Set default values as needed
      segunda: [false],
      terca: [false],
      quarta: [false],
      quinta: [false],
      sexta: [false],
      sabado: [false]
    });
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

}
