import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
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
    { label: 'Sobre', route: '/about', icon: 'info' },
    { label: 'Contato', route: '/contact', icon: 'mail' },
  ];

}
