import { CriarContaComponent } from './componentes/criar-conta/criar-conta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { DetalheCriancaComponent } from './componentes/detalhe-crianca/detalhe-crianca.component';
import { QrcodeComponent } from './componentes/qrcode/qrcode.component';
import { ListaCriancaComponent } from './componentes/lista-crianca/lista-crianca.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { AuthGuardService } from './componentes/auth-guard.service';
import { TelaUsuarioKidsComponent } from './componentes/tela-usuario-kids/tela-usuario-kids.component';
import { InscricoesComponent } from './componentes/inscricoes/inscricoes.component';
import { HomeComponent } from './componentes/home/home.component';
import { DisponibilidadeComponent } from './componentes/disponibilidade/disponibilidade.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { ReunioesComponent } from './componentes/reunioes/reunioes.component';
import { CriarReunioesComponent } from './componentes/criar-reunioes/criar-reunioes.component';
import { DetalheSalaComponent } from './componentes/detalhe-sala/detalhe-sala.component';
import { BuscarCepComponent } from './componentes/buscar-cep/buscar-cep.component';
import { CategoriaGrupoComponent } from './componentes/categoria-grupo/categoria-grupo.component';
import { CadastrarGrupoComponent } from './componentes/cadastrar-grupo/cadastrar-grupo.component';
import { DetalheGrupoComponent } from './componentes/detalhe-grupo/detalhe-grupo.component';
import { ReuniaoGrupoComponent } from './componentes/reuniao-grupo/reuniao-grupo.component';
import { ListaGruposComponent } from './componentes/lista-grupos/lista-grupos.component';

export const routes: Routes = [

  {
   path: '',
   redirectTo: 'login',
   pathMatch: 'full'
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AuthGuardService]
   },
   {
    path: 'mensagem',
    component: MensagemComponent,
    canActivate: [AuthGuardService]
   },
   { path: 'detalhe-crianca/:id',
    component: DetalheCriancaComponent,
    canActivate: [AuthGuardService],
    data: { email: 'emailDoResponsavel' }
   },
   { path: 'mensagem/:telefoneResponsavel',
     component: MensagemComponent,
     canActivate: [AuthGuardService]
   },
   { path: 'qrcode/:qrcodeData',
     component: QrcodeComponent,
     canActivate: [AuthGuardService]
   },
   { path: 'lista-crianca',
     component: ListaCriancaComponent,
     canActivate: [AuthGuardService]
   },
   { path: 'pagina-principal',
    component: PaginaPrincipalComponent,
    canActivate: [AuthGuardService]
   },
   { path: 'login',
    component: LoginUsuarioComponent
   },
   { path: 'criar-conta',
    component: CriarContaComponent
   },
   { path: 'cadastro/:email',
    component: CadastroComponent,
    canActivate: [AuthGuardService]
   },
   { path: 'usuario-kids',
    component: TelaUsuarioKidsComponent,
    canActivate: [AuthGuardService]
   },
   { path: 'inscricoes',
    component: InscricoesComponent,
    canActivate: [AuthGuardService]
   },
   { path: 'home',
    component: HomeComponent
   },
   { path: 'disponibilidade',
     component: DisponibilidadeComponent,
     canActivate: [AuthGuardService]
    },
   { path: 'cadastrar-funcao',
    component: RolesComponent
   },
   { path: 'reunioes',
    component: ReunioesComponent
   },
   { path: 'criar-reuniao',
    component: CriarReunioesComponent
   },
   { path: 'sala/:id',
    component:  DetalheSalaComponent }
    ,
    { path: 'cadastrar-endereco',
     component:  BuscarCepComponent,
     canActivate: [AuthGuardService]
    },
    { path: 'cadastrar-categoria-grupos',
     component:  CategoriaGrupoComponent,
     canActivate: [AuthGuardService]
     },
     { path: 'cadastrar-grupos',
      component:  CadastrarGrupoComponent,
      canActivate: [AuthGuardService]
    },
    { path: 'detalhe-grupos',
     component:  DetalheGrupoComponent,
     canActivate: [AuthGuardService]
   },
   { path: 'cadastro-reuniao-grupo',
    component:  ReuniaoGrupoComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'lista-grupo',
   component:  ListaGruposComponent,
   canActivate: [AuthGuardService]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
