import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from '../models/restoran';
import { Konobar } from '../models/konobar';
import { KonobarService } from '../services/konobar.service';
import { RezervacijaService } from '../services/rezervacija.service';

@Component({
  selector: 'app-restorani',
  templateUrl: './restorani.component.html',
  styleUrls: ['./restorani.component.css']
})
export class RestoraniComponent {

  constructor(private rezervacijaService:RezervacijaService,private router:Router,private gostService: GostService, private restoranService: RestoranService,private konobarService: KonobarService) { }

  sviRestorani:Restoran[]=[]
  sviKonobari:Konobar[]=[]
  opadajuce:boolean=false
  searchParam1:string="";
  searchParam2:string="";
  searchParam3:string="";
  message:string=""

  ngOnInit(): void {
    this.restoranService.dohvatiSveRestorane().subscribe((data: Restoran[])=>{
      this.sviRestorani = data;})
    this.konobarService.dohvatiSveKonobare().subscribe((data: Konobar[])=>{
        this.sviKonobari = data;})
  }

  pretraziRestorane(){
    if(!this.searchParam1&&!this.searchParam2&&!this.searchParam3){
      this.message="Navedite parametar pretrazivanja"
    }
    this.restoranService.pretraziRestorane(this.searchParam1,this.searchParam2,this.searchParam3).subscribe((data: Restoran[])=>{
      this.sviRestorani = data;
    })
  }
  sortirajPoNazivu(){
    this.restoranService.sortirajPoNazivu(this.opadajuce).subscribe((data: Restoran[])=>{
      this.sviRestorani = data;
    })
  }
  sortirajPoTipu(){
    this.restoranService.sortirajPoTipu(this.opadajuce).subscribe((data: Restoran[])=>{
      this.sviRestorani = data;
    })
  }
  sortirajPoAdresi(){
    this.restoranService.sortirajPoAdresi(this.opadajuce).subscribe((data: Restoran[])=>{
      this.sviRestorani = data;
    })
  }

  getKonobariForRestoran(restoran:Restoran): Konobar[] {
    return this.sviKonobari.filter(konobar => konobar.restoran === restoran.naziv);
  }


  logout(){
    localStorage.removeItem('ulogovangost');
    this.router.navigate(['']);
  }

}
