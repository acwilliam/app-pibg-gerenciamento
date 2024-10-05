import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  callback?: () => void;
}


@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

  menuItems: MenuItem[] = [
    { label: 'cadastro', route: '/cadastro', icon: 'home' },
    { label: 'Crianças', route: '/lista-crianca', icon: 'shopping_basket' },
    { label: 'sair', callback: () => this.logout(), icon: 'exit_to_app' },
  ];
  menuActive = false;

  constructor (private authService: AuthService ) {}
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  logout() {
    this.authService.logout();
  }

  navigateToRoute() {
    this.menuActive = false;
  }
}
