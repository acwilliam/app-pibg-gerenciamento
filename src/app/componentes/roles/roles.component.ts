import { Component } from '@angular/core';

interface Role {
  name: string;
  type: string;
  active: boolean;
}

interface VolunteerGroup {
  name: string;
  description: string;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  roles: Role[] = [
    {
      name: 'Lanche',
      type: 'Recepção',
      active: true
    },
    {
      name: 'Violão',
      type: 'Instrumental',
      active: true
    },
    {
      name: 'Cantor',
      type: 'Vocal',
      active: true
    }
  ];

  groups: VolunteerGroup[] = [
    {
      name: 'Música',
      description: 'Grupo musical e vocal'
    },
    {
      name: 'Kids',
      description: 'Ministério infantil'
    }
  ];

  toggleRole(role: Role) {
    role.active = !role.active;
  }

  addRole() {
    // Implement add role logic
  }

  addGroup() {
    // Implement add group logic
  }
}
