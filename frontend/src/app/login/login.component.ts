import { Component } from '@angular/core';
import { GostService } from '../services/gost.service';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import * as CryptoJS from 'crypto-js';
import { Konobar } from '../models/konobar';
import { Gost } from '../models/gost';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from '../models/restoran';
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private rezervacijaService:RezervacijaService,private gostService:GostService,private router: Router, private konobarService:KonobarService,private restoranService:RestoranService) { }



  izabraniTip:string="";
  message:string=""
  kor_ime:string=""
  lozinka:string=""
  sviRestorani:Restoran[]=[]
  sviKonobari:Konobar[]=[]
  sviGosti:Gost[]=[]
  opadajuce:boolean=false
  searchParam1:string="";
  searchParam2:string="";
  searchParam3:string="";
  ukupanBrojRestorana:number=0;
  ukupanBrojGostiju:number=0
  brojRezervacija24:number=0
  brojRezervacija7:number=0
  brojRezervacija30:number=0
  sveRezervacije:Rezervacija[]=[]
  

  ngOnInit(): void {
    this.restoranService.dohvatiSveRestorane().subscribe((data: Restoran[])=>{
      this.sviRestorani = data
      for(var i=0;i<this.sviRestorani.length;i++){
        this.ukupanBrojRestorana=this.ukupanBrojRestorana+1
      }
      ;})
    this.konobarService.dohvatiSveKonobare().subscribe((data: Konobar[])=>{
        this.sviKonobari = data;})
    this.gostService.dohvatiSveGoste().subscribe((data: Gost[])=>{
      this.sviGosti = data
      for(var i=0;i<this.sviGosti.length;i++){
        this.ukupanBrojGostiju=this.ukupanBrojGostiju+1
      }
      ;})
      this.rezervacijaService.dohvatiSveRezervacije().subscribe((data: Rezervacija[])=>{
        this.sveRezervacije = data
        for(var i=0;i<this.sveRezervacije.length;i++){
            const dat=this.parseDateString(this.sveRezervacije[i].datumVreme)
            const dat24=dat
            
            dat24.setHours(dat24.getHours()+24)
            if(dat24>new Date &&this.sveRezervacije[i].status=="pojavio" ||this.sveRezervacije[i].status=="nijepojavio"){
              this.brojRezervacija24=this.brojRezervacija24+1
            }
            const dat7=dat
            dat7.setHours(dat7.getHours()+168)
            if(dat7>new Date &&this.sveRezervacije[i].status=="pojavio" ||this.sveRezervacije[i].status=="nijepojavio"){
              this.brojRezervacija7=this.brojRezervacija7+1
            }
            const dat30=dat
            dat30.setMonth(dat30.getMonth()+1)
            if(dat30>new Date &&this.sveRezervacije[i].status=="pojavio" ||this.sveRezervacije[i].status=="nijepojavio"){
              this.brojRezervacija30=this.brojRezervacija30+1
            }
        }
        ;})
  }
  parseDateString(dateString: string): Date {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes,seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes,seconds);
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

  

  login (){
    if(!this.izabraniTip) this.message="Izaberi tip"
    if(this.izabraniTip=="gost"){
    this.gostService.login(this.kor_ime, this.lozinka).subscribe(gost=>{
      if(gost!=null){
        if(gost.status!="odobren") this.message="Korisnik neodobren ili deaktiviran"
        else{
        localStorage.setItem('ulogovangost', gost.kor_ime);
        this.router.navigate(['gost']);
        }
      }
      else{
        this.message="Korisnik ne postoji"
      }
  },(error) => {
    if (error.status === 401) {
      this.message = "Neispravni podaci";
    } else {
      this.message = "Došlo je do greške";
    }
  });
  }
    else if(this.izabraniTip=="konobar"){
      this.konobarService.login(this.kor_ime, this.lozinka).subscribe(konobar=>{
        if(konobar!=null ){
          if(konobar.status!="odobren") this.message="Korisnik deaktiviran"
          else{
          localStorage.setItem('ulogovankonobar', konobar.kor_ime);
          this.router.navigate(['konobar']);
          }
      }
        else{
        this.message="Korisnik ne postoji"
      }
  },(error) => {
    if (error.status === 401) {
      this.message = "Neispravni podaci";
    } else {
      this.message = "Došlo je do greške";
    }
  });
}
}

}
