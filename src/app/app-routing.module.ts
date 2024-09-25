import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { CriancaComponent } from './componentes/crianca/crianca.component';

export const routes: Routes = [

  { 
   path: '',
   redirectTo: 'cadastro',
   pathMatch: 'full'
  },
  { 
    path: 'cadastro',
    component: CadastroComponent
   },
  { 
    path: 'listaCrianca',
    component: CriancaComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
