import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { LoginAdministratorComponent } from './login-administrator/login-administrator.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RestoraniComponent } from './restorani/restorani.component';
import { RestoranDetaljiComponent } from './restoran-detalji/restoran-detalji.component';
import { DostaveKonobarComponent } from './dostave-konobar/dostave-konobar.component';
import { DostaveGostComponent } from './dostave-gost/dostave-gost.component';
import { RezervacijeKonobarComponent } from './rezervacije-konobar/rezervacije-konobar.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { RezervacijeGostComponent } from './rezervacije-gost/rezervacije-gost.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "gost", component: GostComponent},
  {path: "konobar", component: KonobarComponent},
  {path:"loginAdministrator", component: LoginAdministratorComponent},
  {path:"administrator", component: AdministratorComponent},
  {path:"promenaLozinke", component: PromenaLozinkeComponent},
  {path:"restorani", component: RestoraniComponent},
  { path: 'restoran/:naziv', component: RestoranDetaljiComponent },
  {path:"dostaveK", component: DostaveKonobarComponent},
  {path:"dostaveG", component: DostaveGostComponent},
  {path:"rezervacijeK", component: RezervacijeKonobarComponent},
  {path:"rezervacijeG", component: RezervacijeGostComponent},
  {path:"statistika", component: StatistikaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
