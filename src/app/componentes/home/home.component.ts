import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface Event {
  date: string;
  name: string;
  department: string;
  role: string;
  time: string;
  needsHelp: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
[x: string]: any;
  userName = 'Sabrina';

  eventsNeedingHelp: Event[] = [
    {
      date: '10 de Julho de 2024',
      name: 'Culto de Quarta',
      department: 'Kids',
      role: 'Lanche',
      time: '20:00',
      needsHelp: true
    }
  ];

  upcomingEvents: Event[] = [
    {
      date: '14 de Julho de 2024',
      name: 'Culto Domingo',
      department: 'Louvor',
      role: 'Cantor',
      time: '08:00',
      needsHelp: false
    }
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {}

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    // Implement logout logic
    this.router.navigate(['/login']);
  }

  requestChange(event: Event) {
    // Implement change request logic
  }

  checkIn(event: Event) {
    // Implement check-in logic
  }
}
