import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import { Konobar } from '../models/konobar';
import { DostavaService } from '../services/dostava.service';
import { Dostava } from '../models/dostava';
import { Message } from '../models/message';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dostave-konobar',
  templateUrl: './dostave-konobar.component.html',
  styleUrls: ['./dostave-konobar.component.css']
})
export class DostaveKonobarComponent {

  constructor(private datePipe:DatePipe,private router:Router,private konobarService: KonobarService, private dostavaService:DostavaService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('ulogovankonobar')) {
      this.router.navigate(['']);
    }
    this.sviKonobari=[]
    let konobarKorProv=localStorage.getItem('ulogovankonobar');
    if(konobarKorProv!=null){
      this.konobarKor=konobarKorProv
    }
    this.konobarService.dohvatiKonobara(this.konobarKor).subscribe((data: Konobar)=>{
      this.konobar = data;
      this.dostavaService.dohvatiSveDostave(this.konobar.restoran).subscribe((data: Dostava[])=>{
        this.sveDostave = data;
      })
    })
    
  }
  konobarKor:string=""
  konobar:Konobar= new Konobar
  sviKonobari:Konobar[]=[]
  prihvacena:boolean=false;
  message:string=""

  sveDostave:Dostava[]=[]
  izabranoVreme:string=""
  datumVreme:string=""
  izabranaDostava:Dostava= new Dostava
  prihvata(dostava:Dostava){
    this.prihvacena=true;
    this.izabranaDostava=dostava
  }
  odbijDostavu(dostava:Dostava){
      this.dostavaService.odbijDostavu(dostava).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          alert('Narudzbina odbijena');
          this.ngOnInit();
      }
        else{
          this.message = 'Greska'
      }})
  }
  prihvatiDostavu(dostava:Dostava){
    let dat =new Date()
    alert(this.izabranoVreme)
    if(this.izabranoVreme=="20,30"){
      dat.setMinutes(dat.getMinutes() + 25);
    }
    if(this.izabranoVreme=="40,50"){
      dat.setMinutes(dat.getMinutes() + 45);
    }
    if(this.izabranoVreme=="50,60"){
      dat.setMinutes(dat.getMinutes() + 55);
    }
    alert(dat.getMinutes());
    this.datumVreme = this.datePipe.transform(dat, 'yyyy-MM-dd HH:mm:ss') ?? '';
    this.dostavaService.prihvatiDostavu(dostava,this.datumVreme).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Narudzbina prihvacena');
        this.ngOnInit();
    }
      else{
        this.message = 'Greska'
    }})
  }

  logout(){
    localStorage.removeItem('ulogovankonobar');
    this.router.navigate(['']);
  }

}
