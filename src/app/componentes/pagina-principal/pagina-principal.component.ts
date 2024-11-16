import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  callback?: () => void;
  visible?: boolean;
}


@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent  {
  children: any[] = [ ];
  isPossuiFilhos: boolean = false
  isMembro: boolean = true;
  isAdmin: boolean = false;
  isVoluntario: boolean = false
  emailRecebido: string = '';
  role: string = '';
  menuItems: MenuItem[] = [
    { label: 'cadastro', route: '/cadastro', icon: 'home', visible: true },
    { label: 'Crianças', route: '/lista-crianca', icon: 'shopping_basket', visible: this.isAdmin || this.isVoluntario },
    { label: 'sair', callback: () => this.logout(), icon: 'exit_to_app', visible: true },
  ];
  menuActive = false;

  constructor (
    private authService: AuthService
  )  {}

  ngOnInit() {
    console.log('passo aqui antes')
        this.emailRecebido = this.authService.currentUserValue?.email || '';
        this.buscarCadastrosByEmail()
  }
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  logout() {
    this.authService.logout();
  }

  navigateToRoute() {
    this.menuActive = false;
  }


  buscarCadastrosByEmail() {
    this.role = this.authService.currentUserValue?.role || '';

    if ( this.role === 'A') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }
    this.atualizarMenuItems(this.emailRecebido);

  }

  private atualizarMenuItems(email: string) {
    this.menuItems = [
      { label: 'cadastro', route:`/cadastro/${email}`, icon: 'home', visible: true },
      { label: 'perfil-usuario', route: '/usuario-kids', icon: 'home', visible: true },
      { label: 'disponibilidade', route: '/disponibilidade', icon: 'home', visible: true },
      { label: 'cadastrar função', route: '/cadastrar-funcao', icon: 'home', visible: true },
      { label: 'Crianças', route: '/lista-crianca', icon: 'shopping_basket', visible: this.isAdmin || this.isVoluntario },
      { label: 'sair', callback: () => this.logout(), icon: 'exit_to_app', visible: true },
    ];
  }

}

