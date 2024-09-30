import { Component } from '@angular/core';
import { GostService } from '../services/gost.service';
import { KonobarService } from '../services/konobar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private gostService:GostService,private konobarService: KonobarService,private router: Router) { }

  kor_ime:string=""
  staraLozinka:string="";
  novaLozinka:string="";
  novaLozinkaProvera:string="";
  izabraniTip:string=""
  znamStaruLozinku:Boolean=true;
  bezbedonosnaPitanja:String[]=[
    "Omiljeni pisac",
    "Prvi ljubimac",
    "Omiljeni nastavnik"
  ]
  izabranoPitanje:string=""
  bezb_odgovor:string=""
  potvrdanOdgovor:Boolean=false;

  message:string="";
  passPattern = new RegExp("^(?=[A-Za-z])(?=.*[A-Z])(?=.*\\d)(?=(.*[a-z]){3,})(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,10}$");
  neZnam(){
    this.znamStaruLozinku=false;
  }
  nazad(){
    this.router.navigate(['']);
  }
  proveriPitanje(){
    if(!this.izabraniTip) this.message="Izaberi tip"
    if(this.izabraniTip=="gost"){
    this.gostService.proveriPitanje(this.kor_ime, this.izabranoPitanje,this.bezb_odgovor).subscribe(data=>{
      if(data.message=='ok'){
        this.potvrdanOdgovor=true;

      }
      else{
        this.message="Pogresan odgovor"
      }
  });
  }
    else if(this.izabraniTip=="konobar"){
      this.konobarService.proveriPitanje(this.kor_ime, this.izabranoPitanje,this.bezb_odgovor).subscribe(data=>{
        if(data.message=='ok'){
          this.potvrdanOdgovor=true;
      }
        else{
        this.message="Korisnik ne postoji"
      }
  });
}

  }

  promeni(){
    if(!this.passPattern.test(this.novaLozinka)){
      this.message="Lozinka mora imati minimalno 6 karaktera, maksimalno 10, bar jedan broj, bar jedan specijalni karakter,bar jedno veliko slov, mora pocinjati slovom i imati bar tri mala slova"
      return;
    }
    if(!this.passPattern.test(this.novaLozinkaProvera)){
      this.message="Lozinka mora imati minimalno 6 karaktera, maksimalno 10, bar jedan broj, bar jedan specijalni karakter,bar jedno veliko slov, mora pocinjati slovom i imati bar tri mala slova"
      return;
    }
    if(this.novaLozinka!=this.novaLozinkaProvera){
      this.message=("Lozinke moraju biti iste");
      return;
    }
    if(this.izabraniTip=="gost"){
      this.gostService.login(this.kor_ime, this.staraLozinka).subscribe(gost=>{
        if(gost!=null){
          this.gostService.promeniLozinku(this.novaLozinka,this.kor_ime).subscribe(resp=>{
            if(resp['message']=='ok'){
              alert('Lozinka promenjena')
          }
            else{
              alert('Greska')
          }
          });
          this.router.navigate(['']);
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
    if(this.izabraniTip=="konobar"){
      this.konobarService.login(this.kor_ime, this.staraLozinka).subscribe(konobar=>{
        if(konobar!=null){
          this.konobarService.promeniLozinku(this.novaLozinka,this.kor_ime).subscribe(resp=>{
            if(resp['message']=='ok'){
              alert('Lozinka promenjena')
          }
            else{
              alert('Greska')
          }
          });
          this.router.navigate(['']);
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
  promeni2(){
    if(!this.passPattern.test(this.novaLozinka)){
      this.message="Lozinka mora imati minimalno 6 karaktera, maksimalno 10, bar jedan broj, bar jedan specijalni karakter,bar jedno veliko slov, mora pocinjati slovom i imati bar tri mala slova"
      return;
    }
    if(!this.passPattern.test(this.novaLozinkaProvera)){
      this.message="Lozinka mora imati minimalno 6 karaktera, maksimalno 10, bar jedan broj, bar jedan specijalni karakter,bar jedno veliko slov, mora pocinjati slovom i imati bar tri mala slova"
      return;
    }
    if(this.novaLozinka!=this.novaLozinkaProvera){
      this.message=("Lozinke moraju biti iste");
      return;
    }
    if(this.izabraniTip=="gost"){
          this.gostService.promeniLozinku(this.novaLozinka,this.kor_ime).subscribe(resp=>{
            if(resp['message']=='ok'){
              alert('Lozinka promenjena')
          }
            else{
              alert('Greska')
          }
          });
          this.router.navigate(['']);
        }
    if(this.izabraniTip=="konobar"){
          this.konobarService.promeniLozinku(this.novaLozinka,this.kor_ime).subscribe(resp=>{
            if(resp['message']=='ok'){
              alert('Lozinka promenjena')
          }
            else{
              alert('Greska')
          }
          });
          this.router.navigate(['']);
        } 
    }
  }


