import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { CriancaComponent } from './componentes/crianca/crianca.component';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';

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
   {
    path: 'mensagem',
    component: MensagemComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
