import { Component } from '@angular/core';
import { KonobarService } from '../services/konobar.service';
import { GostService } from '../services/gost.service';
import { AdministratorService } from '../services/administrator.service';
import { Router } from '@angular/router';
import { Konobar } from '../models/konobar';
import { Gost } from '../models/gost';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../services/restoran.service';
import { Radno_vreme } from '../models/radno_vreme';
import { Jelo } from '../models/jelo';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent {
  constructor(private restoranService:RestoranService,private konobarService:KonobarService,private gostService: GostService,private administratorService: AdministratorService,private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('ulogovanadministrator')) {
      this.router.navigate(['']);
    }
    this.dodajR=false
    this.sviGosti=[]
    this.odobreniGosti=[]
    this.sviRestorani=[]
    this.neodobreniGosti=[]
    this.sviKonobari=[];
    this.aktivniKonobari=[];
    this.izabranoPitanje=""
    this.dodajK=false;
    this.promeniK=false;
    this.dodajG=false;
    this.promeniG=false;
    this.izabraniJelovnik= new Restoran
    this.konobarService.dohvatiSveKonobare().subscribe((data: Konobar[])=>{
      this.sviKonobari=data;
      for(let i=0;i<this.sviKonobari.length;i++){
        if(this.sviKonobari[i].status=="odobren"){
          this.aktivniKonobari.push(this.sviKonobari[i])
        }
      }
    })
    this.restoranService.dohvatiSveRestorane().subscribe((data: Restoran[])=>{
      this.sviRestorani=data;
    })
    this.gostService.dohvatiSveGoste().subscribe((data: Gost[])=>{
      this.sviGosti = data;
      for(let i=0;i<this.sviGosti.length;i++){
        if(this.sviGosti[i].status=="odobren"){
          this.odobreniGosti.push(this.sviGosti[i])
        }
        else if(this.sviGosti[i].status=="neodobren"){
          this.neodobreniGosti.push(this.sviGosti[i])
        }
        else if(this.sviGosti[i].status=="blokiran"){
          this.blokiraniGosti.push(this.sviGosti[i])
        }
    }
    })
  }
  sviRestorani:Restoran[]=[]
  sviGosti:Gost[]=[]
  odobreniGosti:Gost[]=[]
  neodobreniGosti:Gost[]=[]
  sviKonobari: Konobar[]=[];
  aktivniKonobari: Konobar[]=[];
  blokiraniGosti:Gost[]=[]

  konobarZaPromenu:Konobar=new Konobar;
  gostZaPromenu:Gost=new Gost;
  promeniK: boolean=false;
  dodajK:boolean=false;
  promeniG: boolean=false;
  dodajG:boolean=false;
  dodajR:boolean=false;
  dRadnoVreme:boolean=false;


  nImgK:any
  nImeK:string=""
  nPrezimeK:string=""
  nPolK:string=""
  nMejlK:string=""
  nTelefonK:number=0
  nAdresaK:string=""
  nRestoranK:string=""
  radnoVreme:Array<Radno_vreme>=[]
  nRadnoVreme:Array<Radno_vreme>=[]
  jelovnik:Array<Jelo>=[]

  dPonedeljakP:string=""
  dUtorakP:string=""
  dSredaP:string=""
  dCetvrtakP:string=""
  dPetakP:string=""
  dSubotaP:string=""
  dNedeljaP:string=""

  dPonedeljakK:string=""
  dUtorakK:string=""
  dSredaK:string=""
  dCetvrtakK:string=""
  dPetakK:string=""
  dSubotaK:string=""
  dNedeljaK:string=""

  

  nImgG:any
  nImeG:string=""
  nPrezimeG:string=""
  nPolG:string=""
  nMejlG:string=""
  nTelefonG:number=0
  nAdresaG:string=""
  nBrojKarticeG:number=0

  dImg:any= "/assets/download.png"
  dKor_ime:string=""
  dLozinka:string=""
  dPotvrdaLozinke:string=""
  izabranoPitanje:string=""
  bezb_odgovor:string=""
  dPol:string=""
  dIme:string=""
  dPrezime:string=""
  dMejl:string=""
  dTelefon:number=0
  dAdresa:string=""
  dBrojKartice:number=0
  dRestoran:string=""
  status:string="odobren";

  dNaziv:string=""
  dTip:string=""
  dOpis:string=""
  dKontakt:number=0;
  dPocetnoVreme:string=""
  dKrajnjeVreme:string=""
  izabraniRestoran:Restoran= new Restoran
  izabraniJelovnik:Restoran= new Restoran

  dImgJ:any
  dNazivJ:string=""
  dCena:number=0;
  dSastojci:string=""
  dodajJ:boolean=false;

  message:string=""
  bezbedonosnaPitanja:String[]=[
    "Omiljeni pisac",
    "Prvi ljubimac",
    "Omiljeni nastavnik"
  ]
  passPattern = new RegExp("^(?=[A-Za-z])(?=.*[A-Z])(?=.*\\d)(?=(.*[a-z]){3,})(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,10}$");

  odobriGosta(kor_ime:string){
    this.gostService.odobriGosta(kor_ime).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Odobreno');
        this.ngOnInit();
      }
      else{
        this.message = 'Greska'
      }
      
    });
  }
  odblokirajGosta(kor_ime:string){
    this.gostService.odblokirajGosta(kor_ime).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Odblokiran');
        this.ngOnInit();
      }
      else{
        this.message = 'Greska'
      }
      
    });
  }
  dodajRadnoVreme(restoran:Restoran){
    this.izabraniRestoran=restoran
    this.dRadnoVreme=true;
  }
  dodajJelo(){
    this.dodajJ=true
  }
  sacuvajJelo(izabraniJelovnik:Restoran){
    let jelo=new Jelo
    jelo.img=this.dImgJ
    jelo.naziv=this.dNazivJ
    jelo.cena=this.dCena
    jelo.sastojci=this.dSastojci
    izabraniJelovnik.jelovnik.push(jelo)
    this.restoranService.sacuvajJelo(this.izabraniJelovnik.naziv,izabraniJelovnik.jelovnik).subscribe(respObj=>{ 
      if(respObj['message']=='ok'){
        this.dodajJ=false;
        alert('Jelo dodato');
        this.ngOnInit();
    }
      else{
        this.message = 'Greska'
    }
    })

  }
  sacuvajRadnoVreme(restoran:Restoran){
    let ponedeljak:Radno_vreme= new Radno_vreme
    let utorak:Radno_vreme= new Radno_vreme
    let sreda:Radno_vreme= new Radno_vreme
    let cetvrtak:Radno_vreme= new Radno_vreme
    let petak:Radno_vreme= new Radno_vreme
    let subota:Radno_vreme= new Radno_vreme
    let nedelja:Radno_vreme= new Radno_vreme
    ponedeljak.pocetno_vreme=this.dPonedeljakP
    ponedeljak.krajnje_vreme=this.dPonedeljakK

    utorak.pocetno_vreme=this.dUtorakP
    utorak.krajnje_vreme=this.dUtorakK

    sreda.pocetno_vreme=this.dSredaP
    sreda.krajnje_vreme=this.dSredaK

    cetvrtak.pocetno_vreme=this.dCetvrtakP
    cetvrtak.krajnje_vreme=this.dCetvrtakK

    petak.pocetno_vreme=this.dPetakP
    petak.krajnje_vreme=this.dPetakK

    subota.pocetno_vreme=this.dSubotaP
    subota.krajnje_vreme=this.dSubotaK

    nedelja.pocetno_vreme=this.dNedeljaP
    nedelja.krajnje_vreme=this.dNedeljaK

    this.nRadnoVreme.push(ponedeljak)
    this.nRadnoVreme.push(utorak)
    this.nRadnoVreme.push(sreda)
    this.nRadnoVreme.push(cetvrtak)
    this.nRadnoVreme.push(petak)
    this.nRadnoVreme.push(subota)
    this.nRadnoVreme.push(nedelja)

    this.izabraniRestoran.radno_vreme=this.nRadnoVreme


    this.restoranService.dodajRadnoVreme(this.izabraniRestoran.naziv,this.izabraniRestoran.radno_vreme).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.dRadnoVreme=false;
        alert('Radno vreme dodato');
        this.ngOnInit();
    }
      else{
        this.message = 'Greska'
    }
    })


  }
  
  
  odbijGosta(kor_ime:string,mejl:string){
    this.gostService.odbijGosta(kor_ime).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Odbijeno');
        this.gostService.dodajOdbijenog(kor_ime,mejl).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            alert('Dodato u odbijene');
            this.ngOnInit();
          }
          else{
            this.message = 'Greska'
          }
        })
      }
      
    });
  }
  obrisiKonobara(kor_ime:string){
    this.konobarService.obrisiKonobara(kor_ime).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Obrisano');
        this.ngOnInit();
      }
      else{
        this.message = 'Greska'   
      }
    });
  }
  obrisiGosta(kor_ime:string){
    this.gostService.obrisiGosta(kor_ime).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert('Obrisano');
        this.ngOnInit();
      }
      else{
        this.message = 'Greska' 
      }
    });
  }
  azurirajKonobara(kor_ime:string){
    for(let i=0;i<this.sviKonobari.length;i++){
      if(this.sviKonobari[i].kor_ime==kor_ime){
        this.konobarZaPromenu=this.sviKonobari[i];
        this.nImeK=this.sviKonobari[i].ime;
        this.nPrezimeK=this.sviKonobari[i].prezime;
        this.nPolK=this.sviKonobari[i].pol;
        this.nMejlK=this.sviKonobari[i].mejl;  
        this.nTelefonK=this.sviKonobari[i].telefon;  
        this.nAdresaK=this.sviKonobari[i].adresa;
        this.nImgK=this.sviKonobari[i].img
        this.nRestoranK=this.sviKonobari[i].restoran
      }
    }
    this.promeniK=true; 
  }
  azurirajGosta(kor_ime:string){
    for(let i=0;i<this.odobreniGosti.length;i++){
      if(this.odobreniGosti[i].kor_ime==kor_ime){
        this.gostZaPromenu=this.odobreniGosti[i];
        this.nImeG=this.odobreniGosti[i].ime;
        this.nPrezimeG=this.odobreniGosti[i].prezime;
        this.nPolG=this.odobreniGosti[i].pol;
        this.nMejlG=this.odobreniGosti[i].mejl;
        this.nTelefonG=this.odobreniGosti[i].telefon;  
        this.nAdresaG=this.odobreniGosti[i].adresa;
        this.nImgG=this.odobreniGosti[i].img
        this.nBrojKarticeG=this.odobreniGosti[i].broj_kartice
      }
    }
    this.promeniG=true; 
  }
  
  
  
  sacuvajIzmeneK(kor_ime:string){
    for(let i=0;i<this.sviKonobari.length;i++){
      if(this.sviKonobari[i].mejl==this.nMejlK && this.sviKonobari[i].kor_ime!=this.konobarZaPromenu.kor_ime){
        this.message='Mejl je zauzet'
      return
    }
  }
    this.konobarService.izmeniPodatke(kor_ime,this.nImeK,this.nPrezimeK,this.nPolK,this.nMejlK,this.nTelefonK,this.nAdresaK,this.nImgK,this.nRestoranK).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.promeniK=false;
        alert('Izmene sacuvane');
        this.ngOnInit();
    }
      else{
        this.message = 'Greska'
    }
    })   
  }
  sacuvajIzmeneG(kor_ime:string){
    for(let i=0;i<this.sviGosti.length;i++){
      if(this.sviGosti[i].mejl==this.nMejlG && this.sviGosti[i].kor_ime!=this.gostZaPromenu.kor_ime){
        this.message='Mejl je zauzet'
      return
    }
    this.gostService.izmeniPodatke(kor_ime,this.nImeG,this.nPrezimeG,this.nPolG,this.nMejlG,this.nTelefonG,this.nAdresaG,this.nImgG,this.nBrojKarticeG).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        alert("Izmene sacuvane")
    }
      else{
        this.message = 'Greska'
    }
    })   
  }
}
  dodajKonobara(){
    this.dodajK=true;
  }
  dodajGosta(){
    this.dodajG=true;
  }
  dodajRestoran(){
    this.dodajR=true;
  }
  sacuvajKonobara(){
    if(!this.dIme||!this.dPrezime|| !this.izabranoPitanje|| !this.bezb_odgovor|| !this.dPol|| !this.dKor_ime || !this.dLozinka || !this.dPotvrdaLozinke || !this.dAdresa ||  !this.dMejl || !this.dTelefon||!this.dRestoran){
      this.message="Morate popuniti sva polja"
      return;
    }
    if(!this.passPattern.test(this.dLozinka)){
      this.message="Lozinka mora imati minimalno 6 karaktera, maksimalno 10, bar jedan broj, bar jedan specijalni karakter,bar jedno veliko slov, mora pocinjati slovom i imati bar tri mala slova"
      return;
    }
    if(this.dLozinka!=this.dPotvrdaLozinke){
      this.message="Lozinke se ne poklapaju"
      return;
    }
    for(let i=0;i<this.sviKonobari.length;i++){
        if(this.sviKonobari[i].kor_ime==this.dKor_ime || this.sviKonobari[i].mejl==this.dMejl){
          this.message='Korisnicko ime, mejl ili broj licence su zauzeti'
        return
      }
    }
    this.konobarService.registracija(this.dIme,this.dPrezime, this.dKor_ime, this.dLozinka,this.izabranoPitanje,this.bezb_odgovor,this.dPol,this.dAdresa,this.dMejl,this.dTelefon,this.status,this.dImg,this.dRestoran).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            alert('Konobar dodat');
            this.ngOnInit();
        }
          else{
            this.message = 'Greska'
        }})
      
  }
  sacuvajGosta(){
    if(!this.dIme||!this.dPrezime|| !this.izabranoPitanje|| !this.bezb_odgovor|| !this.dPol|| !this.dKor_ime || !this.dLozinka || !this.dPotvrdaLozinke || !this.dAdresa ||  !this.dMejl ||!this.dTelefon || !this.dBrojKartice){
      this.message="Morate popuniti sva polja"
      return;
    }
    if(!this.passPattern.test(this.dLozinka)){
      this.message="Lozinka mora imati minimalno 6 karaktera, maksimalno 10, bar jedan broj, bar jedan specijalni karakter,bar jedno veliko slov, mora pocinjati slovom i imati bar tri mala slova"
      return;
    }
    if(this.dLozinka!=this.dPotvrdaLozinke){
      this.message="Lozinke se ne poklapaju"
      return;
    }
      for(let i=0;i<this.sviGosti.length;i++){
        if(this.sviGosti[i].kor_ime==this.dKor_ime || this.sviGosti[i].mejl==this.dMejl){
          this.message='Korisnicko ime ili mejl su zauzeti'
        return
      }
    }
    this.gostService.registracija(this.dIme,this.dPrezime,this.izabranoPitanje,this.bezb_odgovor,this.dPol,this.dKor_ime, this.dLozinka,this.dAdresa,this.dMejl,this.dTelefon,this.status,this.dImg,this.dBrojKartice).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            alert('Gost dodat');
            this.ngOnInit();
        }
          else{
            this.message = 'Greska'
        }})
      
  }
  sacuvajRestoran(){
    if(!this.dNaziv||!this.dTip|| !this.dOpis|| !this.dAdresa|| !this.dKontakt ){
      this.message="Morate popuniti sva polja"
      return;
    }
      for(let i=0;i<this.sviRestorani.length;i++){
        if(this.sviRestorani[i].naziv==this.dNaziv || this.sviRestorani[i].adresa==this.dAdresa){
          this.message='Naziv ili adresa su zauzeti'
        return
      }
    }
    this.radnoVreme=new Array<Radno_vreme>
    this.jelovnik=new Array<Jelo>
    for(var i=0;i<7;i++){
      let rdn_vrm=new Radno_vreme
      this.radnoVreme.push(rdn_vrm)
    }
    this.restoranService.dodajRestoran(this.dNaziv,this.dTip,this.dOpis,this.dAdresa,this.dKontakt,this.radnoVreme,this.jelovnik).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            alert('Restoran dodat');
            this.ngOnInit();
        }
          else{
            this.message = 'Greska'
        }})
      
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
      if(this.dodajK || this.dodajG){
        if(_event.target!=null){
        this.dImg=_event.target.result;
        }
      }
      if(this.promeniK){
        if(_event.target!=null){
          this.nImgK=_event.target.result;
          }
      }
      if(this.promeniG){
        if(_event.target!=null){
          this.nImgG=_event.target.result;
          }
      }
      if(this.dodajJ){
        if(_event.target!=null){
          this.dImgJ=_event.target.result;
          }
      }
       
    }
  }
  onFileSelected(event: any,restoran:Restoran): void {
    const file: File = event.target.files[0];
    this.readFileContent(file,restoran.naziv);
  }
  readFileContent(file: File,naziv:string): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      const jsonData = JSON.parse(fileContent);
      this.restoranService.dodajRaspored(jsonData,naziv).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Raspored dodat'
          this.ngOnInit();
      }
        else{
          this.message = 'Error'
      }
      })
    };
    reader.readAsText(file);
  }
  logout(){
    localStorage.removeItem('ulogovanadministrator');
    this.router.navigate(['']);
  }

}
