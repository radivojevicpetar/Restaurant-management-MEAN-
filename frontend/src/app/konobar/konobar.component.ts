import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import { Konobar } from '../models/konobar';

@Component({
  selector: 'app-konobar',
  templateUrl: './konobar.component.html',
  styleUrls: ['./konobar.component.css']
})
export class KonobarComponent {

  constructor(private router:Router,private konobarService: KonobarService) { }

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
    })
    this.konobarService.dohvatiSveKonobare().subscribe((data: Konobar[])=>{
      this.sviKonobari = data;})
  }

  konobarKor:string=""
  konobar:Konobar= new Konobar
  sviKonobari:Konobar[]=[]
  promeni:boolean=false;

  nImg:any
  nIme:string=""
  nPrezime:string=""
  nMejl:string=""
  nTelefon:number=0
  nAdresa:string=""
  nPol:string=""
  nRestoran:string=""

  message:string=""

  azurirajKonobara(kor_ime:string){     
        this.nIme=this.konobar.ime;
        this.nPrezime=this.konobar.prezime;
        this.nPol=this.konobar.pol
        this.nMejl=this.konobar.mejl;
        this.nTelefon=this.konobar.telefon;  
        this.nAdresa=this.konobar.adresa;
        this.nImg=this.konobar.img  
        this.nRestoran=this.konobar.restoran
        this.promeni=true; 
  }

  sacuvajIzmene(kor_ime:string){
    for(let i=0;i<this.sviKonobari.length;i++){
      if(this.sviKonobari[i].mejl==this.nMejl && this.sviKonobari[i].kor_ime!=this.konobar.kor_ime ){
        this.message='Mejl je zauzet'
      return
    }
    this.konobarService.izmeniPodatke(kor_ime,this.nIme,this.nPrezime,this.nPol,this.nMejl,this.nTelefon,this.nAdresa,this.nImg,this.nRestoran).subscribe(respObj=>{
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
    localStorage.removeItem('ulogovankonobar');
    this.router.navigate(['']);
  }

}
