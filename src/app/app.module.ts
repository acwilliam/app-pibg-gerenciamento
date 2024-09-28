import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../envirionments/environment';
import { AppComponent } from './app.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { CriancaComponent } from './componentes/crianca/crianca.component';
import { AppRoutingModule } from './app-routing.module';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { DetalheCriancaComponent } from './componentes/detalhe-crianca/detalhe-crianca.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodeComponent } from './componentes/qrcode/qrcode.component';
import { ModalDetalheCriancaComponent } from './componentes/modal-detalhe-crianca/modal-detalhe-crianca.component'
@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    CriancaComponent,
    MensagemComponent,
    DetalheCriancaComponent,
    QrcodeComponent,
    ModalDetalheCriancaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
