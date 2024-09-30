import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../services/restoran.service';
import { Konobar } from '../models/konobar';
import { KonobarService } from '../services/konobar.service';
import { GostService } from '../services/gost.service';
import { Gost } from '../models/gost';
import { RezervacijaService } from '../services/rezervacija.service';
import { Jelo } from '../models/jelo';
import { Dostava } from '../models/dostava';
import { DostavaService } from '../services/dostava.service';
import { DatePipe } from '@angular/common';
import { Rezervacija } from '../models/rezervacija';
import { Raspored } from '../models/restoran-raspored';

@Component({
  selector: 'app-restoran-detalji',
  templateUrl: './restoran-detalji.component.html',
  styleUrls: ['./restoran-detalji.component.css']
})
export class RestoranDetaljiComponent {


  constructor(private datePipe: DatePipe,private dostavaService:DostavaService,private gostService:GostService,private route: ActivatedRoute, private restoranService: RestoranService,private konobarService: KonobarService,private router:Router,private rezervacijaService: RezervacijaService) { }

  ngOnInit(): void {
    const naziv = this.route.snapshot.paramMap.get('naziv');
    // Here you would typically fetch the restaurant details from a service based on the id
    if(naziv!=null){
    this.restoranService.dohvatiRestoran(naziv).subscribe((data: Restoran)=>{
      this.restoran = data;
      this.restoranService.dohvatiRaspored(this.restoran.naziv).subscribe((data: Raspored)=>{
        this.raspored = data;
      })
      this.rezervacijaService.dohvatiSveRezervacijeZaRestoran(this.restoran.naziv).subscribe((data: Rezervacija[])=>{
        this.sveRezervacije = data;
      })
    });
    }
    this.konobarService.dohvatiSveKonobare().subscribe((data: Konobar[])=>{
      this.sviKonobari = data;})
      if (!localStorage.getItem('ulogovangost')) {
        this.router.navigate(['']);
      }
      let gostKorProv=localStorage.getItem('ulogovangost');
      if(gostKorProv!=null){
        this.gostKor=gostKorProv
      }
      this.gostService.dohvatiGosta(this.gostKor).subscribe((data: Gost)=>{
        this.gost = data;
      })
      this.dostavaService.dohvatiKorpu(this.gostKor,"neposlata").subscribe((data: Dostava)=>{
        if(data!=null){
        this.korpa = data;
        }
      })
      
  }
  raspored:Raspored= new Raspored
  korpa:any
  gost:Gost=new Gost
  gostKor:string=""
  sviKonobari:Konobar[]=[]
  restoran:Restoran= new Restoran
  message:string=""
  datumVreme:Date=new Date
  vremeDostave:string=""
  brojLjudi:number=0
  dodatniZahtevi:string=""
  kolicina:number=0;
  sveRezervacije:Rezervacija[]=[]
  danasnjiDan:number=0
  vremeRezervacije:string=""
  satMinutRezervacije:string=""
  odgovara:boolean=false;
  idR:number=0;

  getKonobariForRestoran(restoran:Restoran): Konobar[] {
    return this.sviKonobari.filter(konobar => konobar.restoran === restoran.naziv);
  }

  rezervisi(){
    //validacija radnog vremena
    if (this.datumVreme) {
      const datumVremeDate = new Date(this.datumVreme);
    this.satMinutRezervacije = this.datePipe.transform(this.datumVreme, 'HH:mm') ?? '';
    const currentDayOfWeek=datumVremeDate.getDay()
    const dbDayOfWeek=(currentDayOfWeek+6)%7
    if(this.restoran.radno_vreme){
    if(!this.restoran.radno_vreme[dbDayOfWeek] ||this.restoran.radno_vreme[dbDayOfWeek].pocetno_vreme>this.satMinutRezervacije||this.restoran.radno_vreme[dbDayOfWeek].krajnje_vreme<this.satMinutRezervacije){
        this.message="Restoran ne radi u to vreme"
        return
      }
    }
    }
    this.vremeRezervacije = this.datePipe.transform(this.datumVreme, 'yyyy-MM-dd HH:mm:ss') ?? '';
    //validacija slobodnog stola
      for(var j=0;j<this.raspored.stolovi.length;j++){
        if(this.raspored.stolovi[j].brojLjudi>=this.brojLjudi){
          this.odgovara=true;
          for(var i=0;i<this.sveRezervacije.length;i++){
            if(this.sveRezervacije[i].idStola==this.raspored.stolovi[j].idObj && this.sveRezervacije[i].status=="prihvacena"){
              if(this.sveRezervacije[i].datumVreme<this.vremeRezervacije&&this.sveRezervacije[i].datumVremeOdlaska>this.vremeRezervacije){
                this.odgovara=false
                break
              }
            }
          }
        }
        if(this.odgovara==true){
          break
        }
      }
    if(this.odgovara==false){
      this.message="Nema slobodnog stola u to vreme"
      return
    }
    alert(this.sveRezervacije.length)
    if(this.sveRezervacije.length>=1){
    this.idR=this.sveRezervacije[this.sveRezervacije.length-1].idRez+1
    }
    else{
      this.idR=0
    }
    this.rezervacijaService.rezervisiSto(this.idR,this.gost.kor_ime,this.restoran.naziv,this.restoran.adresa,this.vremeRezervacije,this.brojLjudi,this.dodatniZahtevi).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.message="Zahtev za rezervaciju poslat"
            this.ngOnInit();
        }
          else{
            this.message = 'Greska'
        }})
  }
  dodajKorpa(jelo:Jelo){
    if(this.korpa==null){
      let narudzba:Array<Jelo>=[]
      narudzba.push(jelo)
      let dat =Date.now()
      this.vremeDostave = this.datePipe.transform(dat, 'yyyy-MM-dd HH:mm:ss') ?? '';
      jelo.id=0;
      this.dostavaService.novaKorpa(this.gost.kor_ime,this.restoran.naziv,this.vremeDostave,"neposlata",narudzba).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Jelo dodato u korpu');
          this.ngOnInit();
      }
        else{
          this.message = 'Greska'
      }})
    }
    else{
      let dat =Date.now()
      this.vremeDostave = this.datePipe.transform(dat, 'yyyy-MM-dd HH:mm:ss') ?? '';
      jelo.id=this.korpa.narudzbina[this.korpa.narudzbina.length-1].id+1
      this.dostavaService.dodajKorpa(this.gostKor,this.vremeDostave,"neposlata",jelo).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Jelo dodato u korpu');
          this.ngOnInit();
      }
        else{
          this.message = 'Greska'
      }})
    }
  }
  obrisiJelo(jelo:Jelo){
    let dat =Date.now()
    this.vremeDostave = this.datePipe.transform(dat, 'yyyy-MM-dd HH:mm:ss') ?? '';
    this.dostavaService.obrisiKorpa(this.gostKor,this.vremeDostave,"neposlata",jelo.id).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Jelo obrisano iz korpe');
        this.ngOnInit();
    }
      else{
        this.message = 'Greska'
    }})
  }
  posaljiDostavu(korpa:Dostava){
    let dat =Date.now()
    this.vremeDostave = this.datePipe.transform(dat, 'yyyy-MM-dd HH:mm:ss') ?? '';
    for(var i=0;i<korpa.narudzbina.length;i++){
      korpa.iznosRacuna=korpa.iznosRacuna+korpa.narudzbina[i].cena*korpa.narudzbina[i].kolicina
    }
    this.dostavaService.posaljiDostavu(this.gostKor,this.vremeDostave,"poslata",korpa.iznosRacuna).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Dostava poslata'
        this.ngOnInit();
    }
      else{
        this.message = 'Greska'
    }})
  }

  logout(){
    localStorage.removeItem('ulogovangost');
    this.router.navigate(['']);
  }

}
