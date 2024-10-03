import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { DetalheCriancaComponent } from './componentes/detalhe-crianca/detalhe-crianca.component';
import { QrcodeComponent } from './componentes/qrcode/qrcode.component';
import { ListaCriancaComponent } from './componentes/lista-crianca/lista-crianca.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';

export const routes: Routes = [

  {
   path: '',
   redirectTo: 'login',
   pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: CadastroComponent
   },
   {
    path: 'mensagem',
    component: MensagemComponent
   },
   { path: 'detalhe-crianca/:id',
    component: DetalheCriancaComponent
   },
   { path: 'mensagem/:telefoneResponsavel',
     component: MensagemComponent
   },
   { path: 'qrcode/:qrcodeData',
     component: QrcodeComponent
   },
   { path: 'lista-crianca',
     component: ListaCriancaComponent
   },
   { path: 'pagina-principal',
    component: PaginaPrincipalComponent
   },
   { path: 'login',
    component: LoginUsuarioComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
