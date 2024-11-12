import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-block-dialog',
  templateUrl: './date-block-dialog.component.html',
  styleUrl: './date-block-dialog.component.css'
})
export class DateBlockDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DateBlockDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { startDate, endDate } = this.form.value;
      this.dialogRef.close({
        startDate: this.formatDate(startDate),
        endDate: this.formatDate(endDate)
      });
    }
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
