import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { CriancaComponent } from './componentes/crianca/crianca.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    CriancaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
