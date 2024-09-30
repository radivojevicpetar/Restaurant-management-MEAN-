import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RezervacijaService } from '../services/rezervacija.service';
import { RestoranService } from '../services/restoran.service';
import { DatePipe } from '@angular/common';
import { GostService } from '../services/gost.service';
import { Gost } from '../models/gost';
import { Rezervacija } from '../models/rezervacija';

@Component({
  selector: 'app-rezervacije-gost',
  templateUrl: './rezervacije-gost.component.html',
  styleUrls: ['./rezervacije-gost.component.css']
})
export class RezervacijeGostComponent {

  constructor(private datePipe: DatePipe,private gostService:GostService, private restoranService: RestoranService,private router:Router,private rezervacijaService: RezervacijaService){}

  ngOnInit(): void {
  if (!localStorage.getItem('ulogovangost')) {
    this.router.navigate(['']);
  }
  let gostKorProv=localStorage.getItem('ulogovangost');
  if(gostKorProv!=null){
    this.gostKor=gostKorProv
  }
  this.gostService.dohvatiGosta(this.gostKor).subscribe((data: Gost)=>{
    this.gost = data;
    this.rezervacijaService.dohvatiSveRezervacijeZaGosta(this.gostKor).subscribe((data: Rezervacija[])=>{
      this.sveRezervacije = data;
      this.sveRezervacije=this.sortRezervacijeByVreme(this.sveRezervacije)
      for(var i=0;i<this.sveRezervacije.length;i++){
        if(this.sveRezervacije[i].status=="prihvacena"){
          this.aktuelneRezervacije.push(this.sveRezervacije[i])
        }
        if(this.sveRezervacije[i].status=="nijepojavio"||this.sveRezervacije[i].status=="pojavio"){
          this.zavrseneRezervacije.push(this.sveRezervacije[i])
        }
      }
    })
  })
}

  gost:Gost=new Gost
  gostKor:string=""
  sveRezervacije:Rezervacija[]=[]
  aktuelneRezervacije:Rezervacija[]=[]
  zavrseneRezervacije:Rezervacija[]=[]
  message:string=""
  komentar:string=""
  ocena:number=0
  oceni:boolean=false

  reservationRating: number = 0;

  setRating(rating: number) {
    this.ocena = rating;
    // You can perform additional actions here, such as saving the rating to a database
    alert(this.ocena)
  }
  oceniRez(){
    this.oceni=true
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
  ostaviOcenu(rezervacija:Rezervacija){
    if(rezervacija.status!="pojavio"){
      this.message="Ne mozete ostaviti ocenu za rezervaciju za koju se niste pojavili"
      return
    }
    this.rezervacijaService.ostaviOcenu(rezervacija.idRez,rezervacija.restoran,this.komentar,this.ocena).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Ocena ostavljena');
          this.ngOnInit() 
      }
        else{
          this.message = 'Greska'
      }})
  }
  otkaziRezervaciju(rezervacija:Rezervacija){
    const dat=this.parseDateString(rezervacija.datumVreme)
    dat.setMinutes(dat.getMinutes()-45)
    if(dat>new Date){
      this.rezervacijaService.otkaziRezervaciju(rezervacija.idRez,rezervacija.restoran).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Rezervacija otkazana');
          this.ngOnInit() 
      }
        else{
          this.message = 'Greska'
      }})

    }
    else{
      this.message="Ne mozete vise otkazati rezervaciju"
    }
  }

  logout(){
    localStorage.removeItem('ulogovankonobar');
    this.router.navigate(['']);
  }

}
