import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Gost } from '../models/gost';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent {

  constructor(private router:Router,private gostService: GostService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('ulogovangost')) {
      this.router.navigate(['']);
    }
    this.sviGosti=[]
    let gostKorProv=localStorage.getItem('ulogovangost');
    if(gostKorProv!=null){
      this.gostKor=gostKorProv
    }
    this.gostService.dohvatiGosta(this.gostKor).subscribe((data: Gost)=>{
      this.gost = data;
    })
    this.gostService.dohvatiSveGoste().subscribe((data: Gost[])=>{
      this.sviGosti = data;})
  }

  gostKor:string=""
  gost:Gost= new Gost
  sviGosti:Gost[]=[]
  promeni:boolean=false;

  nImg:any
  nIme:string=""
  nPrezime:string=""
  nMejl:string=""
  nTelefon:number=0
  nAdresa:string=""
  nPol:string=""
  nBrojKartice:number=0

  message:string=""

  azurirajGosta(kor_ime:string){     
        this.nIme=this.gost.ime;
        this.nPrezime=this.gost.prezime;
        this.nPol=this.gost.pol
        this.nMejl=this.gost.mejl;
        this.nTelefon=this.gost.telefon;  
        this.nAdresa=this.gost.adresa;
        this.nImg=this.gost.img  
        this.nBrojKartice=this.gost.broj_kartice
        this.promeni=true; 
  }

  sacuvajIzmene(kor_ime:string){
    for(let i=0;i<this.sviGosti.length;i++){
      if(this.sviGosti[i].mejl==this.nMejl && this.sviGosti[i].kor_ime!=this.gost.kor_ime ){
        this.message='Mejl je zauzet'
      return
    }
    this.gostService.izmeniPodatke(kor_ime,this.nIme,this.nPrezime,this.nPol,this.nMejl,this.nTelefon,this.nAdresa,this.nImg,this.nBrojKartice).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.promeni=false;
        alert('Izmene sacuvane');
        this.ngOnInit();
    }
      else{
        this.message = 'Greska'
    }
    })   
  }
}

  selectFile(event: any) { 
  
    var mimeType = event.target.files[0].type;
    
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported";
      return;
    }
    
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    
    reader.onload = (_event) => {
      var img = new Image();
      img.onload = (event_img: any)=>{
        if(img.width > 300 || img.width < 100 || img.height > 300 || img.height < 100)
        {
          this.message = "Slika mora biti izmedju 100px i 300px";   
        }}
      this.message = "";

      if(this.promeni){
        if(_event.target!=null){
        this.nImg=_event.target.result;
        }
      }
       
    }
  }

  logout(){
    localStorage.removeItem('ulogovangost');
    this.router.navigate(['']);
  }

}
