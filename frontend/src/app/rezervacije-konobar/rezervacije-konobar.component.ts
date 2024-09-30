import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Raspored } from '../models/restoran-raspored';
import { KonobarService } from '../services/konobar.service';
import { Router } from '@angular/router';
import { Konobar } from '../models/konobar';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../services/restoran.service';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijaService } from '../services/rezervacija.service';
import { Objekat } from '../models/objekat';
import { DatePipe } from '@angular/common';
import { GostService } from '../services/gost.service';

@Component({
  selector: 'app-rezervacije-konobar',
  templateUrl: './rezervacije-konobar.component.html',
  styleUrls: ['./rezervacije-konobar.component.css']
})
export class RezervacijeKonobarComponent implements AfterViewInit {

  @ViewChild('canvasEl') canvasEl: ElementRef=new ElementRef(HTMLCanvasElement);
  private context: any;
  constructor(private gostService:GostService,private datePipe: DatePipe,private router:Router,private konobarService: KonobarService,private restoranService: RestoranService,private rezervacijaService: RezervacijaService) { }

  
  ngAfterViewInit(): void {
    if (!localStorage.getItem('ulogovankonobar')) {
      this.router.navigate(['']);
    }
    let konobarKorProv=localStorage.getItem('ulogovankonobar');
    if(konobarKorProv!=null){
      this.konobarKor=konobarKorProv
    }
    this.konobarService.dohvatiKonobara(this.konobarKor).subscribe((data: Konobar)=>{
      this.konobar = data;
      this.restoranService.dohvatiRestoran(this.konobar.restoran).subscribe((data: Restoran)=>{
        this.restoran=data;
        this.rezervacijaService.dohvatiSveRezervacijeZaRestoran(this.restoran.naziv).subscribe((data: Rezervacija[])=>{
          this.sveRezervacije = data;
          this.sveRezervacije = this.sortRezervacijeByVreme(this.sveRezervacije);
          for(var i=0;i<this.sveRezervacije.length;i++){
            if(this.sveRezervacije[i].status=="poslata"){
              this.primljeneRezervacije.push(this.sveRezervacije[i])
            }
            if(this.sveRezervacije[i].status=="prihvacena"){
              this.prihvaceneRezervacije.push(this.sveRezervacije[i])
            }

          }
        })
        this.restoranService.dohvatiRaspored(this.restoran.naziv).subscribe((data: Raspored)=>{
          this.raspored = data;
          this.iscrtajSkicu();
        })
      })
    })
    this.context = (
      this.canvasEl.nativeElement as HTMLCanvasElement
    ).getContext('2d');
        
  }
  prihvacena:boolean=false;
  odbijena:boolean=false;
  izabraniSto:Objekat=new Objekat
  sveRezervacije:Rezervacija[]=[]
  primljeneRezervacije:Rezervacija[]=[]
  prihvaceneRezervacije:Rezervacija[]=[]
  raspored:Raspored=new Raspored
  konobarKor:string=""
  konobar:Konobar= new Konobar
  restoran:Restoran=new Restoran
  xu:number=0
  yu:number=0
  sirinau:number=0
  visinau:number=0
  statusZaDraw:string=""
  brojLjudi:number=0
  radius:number=0
  komentar:string=""
  izabranaRezervacija:Rezervacija=new Rezervacija
  message:string=""
  setovanSto:boolean=false;
  pojavio:boolean=false;
  nijePojavio:boolean=false;
  iscrtajSkicu(){
    for(var i=0;i<this.raspored.stolovi.length;i++){
      this.xu=this.raspored.stolovi[i].xkoor
      this.yu=this.raspored.stolovi[i].ykoor
      this.radius=this.raspored.stolovi[i].radius
      this.statusZaDraw="stolovi"
      this.brojLjudi=this.raspored.stolovi[i].brojLjudi
      this.draw();
    }
    for(var i=0;i<this.raspored.kuhinja.length;i++){
      this.xu=this.raspored.kuhinja[i].xkoor
      this.yu=this.raspored.kuhinja[i].ykoor
      this.sirinau=this.raspored.kuhinja[i].sirina
      this.visinau=this.raspored.kuhinja[i].visina
      this.statusZaDraw="kuhinja"
      this.draw();
    }
    for(var i=0;i<this.raspored.toalet.length;i++){
      this.xu=this.raspored.toalet[i].xkoor
      this.yu=this.raspored.toalet[i].ykoor
      this.sirinau=this.raspored.toalet[i].sirina
      this.visinau=this.raspored.toalet[i].visina
      this.statusZaDraw="toalet"
      this.draw();
    }
  }
  draw() {
    if(!this.context) return
    this.context.font = '15px Arial';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    

    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
    if(this.statusZaDraw=="stolovi"){
      let centerX = this.xu + this.radius;
      let centerY = this.yu + this.radius;
      this.context.fillStyle = "#FFF";
      this.context.strokeStyle="#000"
      this.context.beginPath()
      this.context.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
      this.context.stroke();
      this.context.fill();
      this.context.closePath();
      this.context.fillStyle = "#000"; // Set text color
      this.context.font = "16px Arial"; // Set font size and type
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(this.brojLjudi, centerX, centerY);
    }
    if(this.statusZaDraw=="kuhinja"){
      this.context.fillStyle = "#FFF";
      this.context.strokeStyle="#000"
      this.context.beginPath();
      this.context.strokeRect(this.xu,this.yu,this.sirinau,this.visinau);
      this.context.fillRect(this.xu,this.yu,this.sirinau,this.visinau)
      this.context.closePath();
      this.context.fillStyle = "#000"; // Set text color
      this.context.font = "16px Arial"; // Set font size and type
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText("kuhinja", this.xu+this.sirinau/2, this.yu+this.visinau/2);
    }
    if(this.statusZaDraw=="toalet"){
      this.context.fillStyle = "#FFF";
      this.context.strokeStyle="#000"
      this.context.beginPath();
      this.context.strokeRect(this.xu,this.yu,this.sirinau,this.visinau);
      this.context.fillRect(this.xu,this.yu,this.sirinau,this.visinau)
      this.context.closePath();
      this.context.fillStyle = "#000"; // Set text color
      this.context.font = "16px Arial"; // Set font size and type
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText("toalet", this.xu+this.sirinau/2, this.yu+this.visinau/2);
    }
    if(this.statusZaDraw=="izabranSto"){
      let centerX = this.xu + this.radius;
      let centerY = this.yu + this.radius;
      this.context.fillStyle = "#F00";
      this.context.strokeStyle="#000"
      this.context.beginPath()
      this.context.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
      this.context.stroke();
      this.context.fill();
      this.context.closePath();
      this.context.fillStyle = "#000"; // Set text color
      this.context.font = "16px Arial"; // Set font size and type
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(this.brojLjudi, centerX, centerY);
    }
      
  }
  prihvatiRezervaciju(rezervacija:Rezervacija){
    this.prihvacena=true
    this.izabranaRezervacija=rezervacija
  }
  odbijRezervaciju(rezervacija:Rezervacija){
    this.odbijena=true
    this.izabranaRezervacija=rezervacija

  }
  rezervacijaPoslata(rezervacija:Rezervacija){
    return rezervacija.status=="poslata"
  }
  pojavioSe(rezervacija:Rezervacija){
    this.izabranaRezervacija=rezervacija
    let dat=this.parseDateString(this.izabranaRezervacija.datumVreme)
    dat.setMinutes(dat.getMinutes()+30)
    if(new Date<dat){
      this.message="Jos uvek nije vreme rezervacije"
    }
    else{
      this.rezervacijaService.cekirajPojavljivanje(this.izabranaRezervacija.idRez,this.restoran.naziv,).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Pojavljivanje cekirano'); 
          this.pojavio=true 
      }
        else{
          this.message = 'Greska'
      }})
    }
  }
  nijeSePojavio(rezervacija:Rezervacija){
    this.izabranaRezervacija=rezervacija
    let dat=this.parseDateString(this.izabranaRezervacija.datumVreme)
    dat.setMinutes(dat.getMinutes()+30)
    if(new Date<dat){
      this.message="Jos uvek nije vreme rezervacije"
    }
    else{
      this.rezervacijaService.cekirajNepojavljivanje(this.izabranaRezervacija.idRez,this.restoran.naziv).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Nepojavljivanje cekirano'); 
          this.nijePojavio=true 
          const brojNepojavljivanja:number=0
          for(var i=0;i<this.sveRezervacije.length;i++){
            if(this.izabranaRezervacija.gost==this.sveRezervacije[i].gost&&this.sveRezervacije[i].gost=="nijepojavio"){
                this.gostService.blokirajGosta(this.izabranaRezervacija.gost).subscribe(respObj=>{
                  if(respObj['message']=='ok'){
                    alert("Gost blokiran")
                  }
                  else{
                    this.message='Greska'
                  }
                })
            }
          }
      }
        else{
          this.message = 'Greska'
      }})
    }
  }
  produziBoravak(rezervacija:Rezervacija){
    this.izabranaRezervacija=rezervacija
    let dat=this.parseDateString(this.izabranaRezervacija.datumVremeOdlaska)
    let dat2=this.parseDateString(this.izabranaRezervacija.datumVreme)
    if(new Date>dat2 && new Date< dat){
    dat.setHours(dat.getHours()+1)
    this.izabranaRezervacija.datumVremeOdlaska = this.datePipe.transform(dat, 'yyyy-MM-dd HH:mm:ss') ?? '';
    this.rezervacijaService.produziBoravak(this.izabranaRezervacija.idRez,this.restoran.naziv,this.izabranaRezervacija.datumVremeOdlaska).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Boravak produzen');  
    }
      else{
        this.message = 'Greska'
    }})
  }
  else{
    this.message = 'Rezervacija nije u toku'
  }

  }
  sacuvajRezervaciju(rezervacija:Rezervacija){
    for(var i=0;i<this.sveRezervacije.length;i++){
      if(this.sveRezervacije[i].idStola==this.izabraniSto.idObj && this.sveRezervacije[i].status=="prihvacena"){
        if(this.izabranaRezervacija.datumVreme<this.sveRezervacije[i].datumVremeOdlaska&&this.izabranaRezervacija.datumVreme>this.sveRezervacije[i].datumVreme){
          this.message="Sto je zauzet u to vreme"
          return
        }
      }
    }
    if(this.izabraniSto.brojLjudi<this.izabranaRezervacija.brojLjudi){
      this.message="Sto je premali"
      return
    }
      let dat=this.parseDateString(this.izabranaRezervacija.datumVreme)
      dat.setHours(dat.getHours()+3)
      this.izabranaRezervacija.datumVremeOdlaska = this.datePipe.transform(dat, 'yyyy-MM-dd HH:mm:ss') ?? '';
      this.rezervacijaService.prihvatiRezervaciju(this.izabranaRezervacija.idRez,this.restoran.naziv,this.konobar.kor_ime,this.izabranaRezervacija.datumVremeOdlaska,this.izabraniSto.idObj).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Rezervacija prihvacena');
          this.xu=this.izabraniSto.xkoor
          this.yu=this.izabraniSto.ykoor
          this.radius=this.izabraniSto.radius
          this.statusZaDraw="izabranSto"
          this.brojLjudi=this.izabraniSto.brojLjudi
          this.draw();   
      }
        else{
          this.message = 'Greska'
      }})

  }
  sacuvajOdbijenicu(rezervacija:Rezervacija){
    this.rezervacijaService.odbijRezervaciju(this.izabranaRezervacija.idRez,this.restoran.naziv,this.komentar).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Rezervacija odbijena');  
    }
      else{
        this.message = 'Greska'
    }})
  }
  parseDateString(dateString: string): Date {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes,seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes,seconds);
  }
  sortRezervacijeByVreme(rezervacije: Rezervacija[]): Rezervacija[] {
    return rezervacije.sort((a, b) => {
      const dateA = this.parseDateString(a.datumVreme);
      const dateB = this.parseDateString(b.datumVreme);
      
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      return 0;
    });
  }

  logout(){
    localStorage.removeItem('ulogovankonobar');
    this.router.navigate(['']);
  }
}
