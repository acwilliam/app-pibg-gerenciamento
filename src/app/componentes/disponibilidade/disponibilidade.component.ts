import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { DateBlockDialogComponent } from '../date-block-dialog/date-block-dialog.component';
import { CadastroService } from '../cadastro.service';
import { AuthService } from '../auth.service';

interface DateBlock {
  startDate: string;
  endDate: string;
}

interface DayAvailability {
  fullDay: boolean;
  morning: boolean;
  afternoon: boolean;
  night: boolean;
}

export interface WeeklyAvailability {
  [key: string]: {
    enabled: boolean;
    periods: DayAvailability;
  };
}

export interface AvailabilityData {
  emailvoluntario: string;
  weeklyAvailability: WeeklyAvailability;
  dateBlocks: DateBlock[];
}

@Component({
  selector: 'app-disponibilidade',
  templateUrl: './disponibilidade.component.html',
  styleUrls: ['./disponibilidade.component.css']
})
export class DisponibilidadeComponent implements OnInit {
  weekDays = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

  dateRange = new FormControl();
  showDateRangePicker = false;
  availabilityForm!: FormGroup;
  periodsForm!: FormGroup;

  dateBlocks: DateBlock[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.availabilityForm = this.fb.group({
      domingo: [true],
      segunda: [true],
      terca: [true],
      quarta: [true],
      quinta: [true],
      sexta: [true],
      sabado: [true]
    });

    this.initializeForms()
  }

  private initializeForms() {
    const dayToggles: { [key: string]: boolean } = {};
    const dayPeriods: { [key: string]: FormGroup } = {};

    this.weekDays.forEach(day => {
      const dayLower = day.toLowerCase();
      dayToggles[dayLower] = false;

      // Criando form group para cada periodo do dia
      dayPeriods[`${dayLower}Periods`] = this.fb.group({
        fullDay: [false],
        morning: [false],
        afternoon: [false],
        night: [false]
      });
    });

    this.availabilityForm = this.fb.group(dayToggles);
    this.periodsForm = this.fb.group(dayPeriods);

    // Subscribe to changes in day toggles to enable/disable periods
    Object.keys(dayToggles).forEach(day => {
      this.availabilityForm.get(day)?.valueChanges.subscribe(enabled => {
        const periodControls = this.periodsForm.get(`${day}Periods`) as FormGroup;
        if (enabled) {
          periodControls.enable();
        } else {
          periodControls.disable();
          Object.keys(periodControls.controls).forEach(control => {
            periodControls.get(control)?.setValue(false);
          });
        }
      });
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
  getAvailabilityData(): AvailabilityData {
    const weeklyAvailability: WeeklyAvailability = {};
    const emailvoluntario = this.authService.currentUserValue?.email || ''
    this.weekDays.forEach(day => {
      const dayLower = day.toLowerCase();
      const dayEnabled = this.availabilityForm.get(dayLower)?.value;
      const dayPeriods = this.periodsForm.get(`${dayLower}Periods`)?.value;
      weeklyAvailability[dayLower] = {
        enabled: dayEnabled,
        periods: {
          fullDay: dayPeriods?.fullDay || false,
          morning: dayPeriods?.morning || false,
          afternoon: dayPeriods?.afternoon || false,
          night: dayPeriods?.night || false
        }
      };
    });
    console.log('semana disponivel', weeklyAvailability)
    return {
      emailvoluntario,
      weeklyAvailability,
      dateBlocks: [...this.dateBlocks]
    };
  }

  saveToFirestore() {
    this.cadastroService.cadastrarConfiguracaoDisponibilidade(this.getAvailabilityData())
  }

}
