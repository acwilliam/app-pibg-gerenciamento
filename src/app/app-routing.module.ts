import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { CriancaComponent } from './componentes/crianca/crianca.component';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { DetalheCriancaComponent } from './componentes/detalhe-crianca/detalhe-crianca.component';

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
   { path: 'detalhe-crianca/:id',
    component: DetalheCriancaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
