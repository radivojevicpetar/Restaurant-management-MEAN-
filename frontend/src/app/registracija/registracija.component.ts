import { Component } from '@angular/core';
import { GostService } from '../services/gost.service';
import { Gost } from '../models/gost';
import { Router } from '@angular/router';
import { Odbijeni } from '../models/odbijeni';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent {

  constructor(private gostService:GostService,private router: Router) { }

  ngOnInit(): void {
    this.gostService.dohvatiSveGoste().subscribe((data: Gost[])=>{
      this.sviGosti = data;
    })
    this.gostService.dohvatiSveOdbijene().subscribe((data: Odbijeni[])=>{
      this.sviOdbijeni = data;
    })
  }
  sviGosti:Gost[]=[]
  sviOdbijeni:Odbijeni[]=[]
  bezbedonosnaPitanja:String[]=[
    "Omiljeni pisac",
    "Prvi ljubimac",
    "Omiljeni nastavnik"
  ]

  kor_ime:string=""
  lozinka:string=""
  izabranoPitanje:string=""
  bezb_odgovor:string=""
  izabraniPol:string=""
  potvrdaLozinke:string=""
  ime:string=""
  prezime:string=""
  adresa:string=""
  mejl:string=""
  telefon:number=0
  broj_kartice:number=0
  message:string=""
  status:string="neodobren"
  img:any = "/assets/download.png"
  
  passPattern = new RegExp("^(?=[A-Za-z])(?=.*[A-Z])(?=.*\\d)(?=(.*[a-z]){3,})(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,10}$");
  
  nazad(){
    this.router.navigate(['']);
  }
  registracija(){
    if(!this.prezime || !this.ime|| !this.kor_ime || !this.lozinka || !this.potvrdaLozinke ||!this.izabraniPol|| !this.adresa ||  !this.mejl || !this.telefon || !this.broj_kartice || !this.bezb_odgovor){
      this.message="Morate popuniti sva polja"
      return;
    }
    if(!this.passPattern.test(this.lozinka)){
      this.message="Lozinka mora imati minimalno 6 karaktera, maksimalno 10, bar jedan broj, bar jedan specijalni karakter,bar jedno veliko slov, mora pocinjati slovom i imati bar tri mala slova"
      return;
    }
    if(this.lozinka!=this.potvrdaLozinke){
      this.message="Lozinke se ne poklapaju"
      return;
    }
    for(let i=0;i<this.sviOdbijeni.length;i++){
      if(this.sviOdbijeni[i].kor_ime==this.kor_ime || this.sviOdbijeni[i].mejl==this.mejl){
        this.message='Korisnik odbijen'
      return
      }
    } 
      for(let i=0;i<this.sviGosti.length;i++){
        if(this.sviGosti[i].kor_ime==this.kor_ime || this.sviGosti[i].mejl==this.mejl){
          this.message='Korisnicko ime ili mejl su zauzeti'
        return
      }
    }
    this.gostService.registracija(this.ime, this.prezime,this.izabraniPol, this.kor_ime, this.lozinka,this.izabranoPitanje,this.bezb_odgovor,this.adresa, this.mejl,this.telefon,this.status,this.img,this.broj_kartice).subscribe(data=>{
      if(data.message=='ok'){
        this.message = 'gost dodat'
    }
      else{
        this.message = 'Greska'
    }
  }
  );  
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
    if(_event.target!=null){
    this.img=_event.target.result; 
    }
  }
}

}
