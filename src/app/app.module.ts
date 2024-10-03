import { FormGroup, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    MensagemComponent,
    DetalheCriancaComponent,
    QrcodeComponent,
    ListaCriancaComponent,
    PaginaPrincipalComponent,
    LoginUsuarioComponent
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
     FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
