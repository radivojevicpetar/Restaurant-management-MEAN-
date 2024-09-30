import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './registracija/registracija.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginAdministratorComponent } from './login-administrator/login-administrator.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RestoraniComponent } from './restorani/restorani.component';
import { RestoranDetaljiComponent } from './restoran-detalji/restoran-detalji.component';
import { DatePipe } from '@angular/common';
import { DostaveKonobarComponent } from './dostave-konobar/dostave-konobar.component';
import { DostaveGostComponent } from './dostave-gost/dostave-gost.component';
import { RezervacijeKonobarComponent } from './rezervacije-konobar/rezervacije-konobar.component';
import { RezervacijeGostComponent } from './rezervacije-gost/rezervacije-gost.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    GostComponent,
    KonobarComponent,
    AdministratorComponent,
    LoginAdministratorComponent,
    PromenaLozinkeComponent,
    RestoraniComponent,
    RestoranDetaljiComponent,
    DostaveKonobarComponent,
    DostaveGostComponent,
    RezervacijeKonobarComponent,
    RezervacijeGostComponent,
    StatistikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
