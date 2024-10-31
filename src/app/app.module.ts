import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../envirionments/environment';
import { AppComponent } from './app.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { AppRoutingModule } from './app-routing.module';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { DetalheCriancaComponent } from './componentes/detalhe-crianca/detalhe-crianca.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodeComponent } from './componentes/qrcode/qrcode.component';
import { ListaCriancaComponent } from './componentes/lista-crianca/lista-crianca.component'
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { NgxPrintModule } from 'ngx-print';
import { CriarContaComponent } from './componentes/criar-conta/criar-conta.component';
import { MatListModule } from '@angular/material/list';
import { TelaUsuarioKidsComponent } from './componentes/tela-usuario-kids/tela-usuario-kids.component';
import { HasholeDirective } from './diretivas/hashole.directive';
import { MascaraTelefoneDirective } from './diretivas/mascara-telefone.directive';
import { CheckInModalComponent } from './modais/check-in-modal/check-in-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ServiceWorkerModule } from '@angular/service-worker';
import { InscricoesComponent } from './componentes/inscricoes/inscricoes.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    MensagemComponent,
    DetalheCriancaComponent,
    QrcodeComponent,
    ListaCriancaComponent,
    PaginaPrincipalComponent,
    LoginUsuarioComponent,
    CriarContaComponent,
    TelaUsuarioKidsComponent,
    HasholeDirective,
    MascaraTelefoneDirective,
    CheckInModalComponent,
    InscricoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    QRCodeModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
    NgxPrintModule,
    ReactiveFormsModule,
    MatListModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
