import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  callback?: () => void;
  visible?: boolean;
  showDropdown?: boolean;
  dropdownItems?: { label: string, route: string }[];
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
    { label: 'Cadastro Criança', route: '/cadastro', icon: 'home', visible: true },
    {
      label: 'Grupos',
      icon: 'groups',
      visible: true,
      dropdownItems: [
        { label: 'Ver todos', route: '/detalhe-grupos' },
        { label: 'Adicionar grupo', route: '/cadastrar-grupos' },
        { label: 'Categorias de grupos', route: '/cadastrar-categoria-grupos' },
        { label: 'Relatórios', route: '/relatorios-grupos' },
        { label: 'Importar/Exportar', route: '/importar-exportar-grupos' },
        { label: 'Liderança', route: '' }
      ]
    },
    { label: 'User', route: '/usuario-kids', icon: 'person', visible: true },
    { label: 'disponibilidade', route: '/disponibilidade', icon: 'event_available', visible: true },
    { label: 'Reuniões', route: '/reunioes', icon: 'event', visible: true },
    { label: 'Crianças', route: '/lista-crianca', icon: 'child_care', visible: this.isAdmin || this.isVoluntario },
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
      { label: 'Cadastro Criança', route: `/cadastro/${email}`, icon: 'home', visible: true },
      {
        label: 'Grupos',
        icon: 'groups',
        visible: true,
        dropdownItems: [
          { label: 'Ver todos', route: '/detalhe-grupos' },
          { label: 'Adicionar grupo', route: '/cadastrar-grupos' },
          { label: 'Categorias de grupos', route: '/cadastrar-categoria-grupos' },
          { label: 'Relatórios', route: '/relatorios-grupos' },
          { label: 'Importar/Exportar', route: '/importar-exportar-grupos' },
          { label: 'Cadastrar função', route: '/cadastrar-funcao' }
        ]
      },
      { label: 'User', route: '/usuario-kids', icon: 'person', visible: true },
      { label: 'disponibilidade', route: '/disponibilidade', icon: 'event_available', visible: true },
      { label: 'Reuniões', route: '/reunioes', icon: 'event', visible: true },
      { label: 'Crianças', route: '/lista-crianca', icon: 'child_care', visible: this.isAdmin || this.isVoluntario },
      { label: 'sair', callback: () => this.logout(), icon: 'exit_to_app', visible: true },
    ];
  }

  showDropdown(item: MenuItem) {
    item.showDropdown = true;
  }

  hideDropdown(item: MenuItem) {
    item.showDropdown = false;
  }


}

