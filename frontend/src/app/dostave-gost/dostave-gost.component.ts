import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { DostavaService } from '../services/dostava.service';
import { Gost } from '../models/gost';
import { Dostava } from '../models/dostava';

@Component({
  selector: 'app-dostave-gost',
  templateUrl: './dostave-gost.component.html',
  styleUrls: ['./dostave-gost.component.css']
})
export class DostaveGostComponent {

  constructor(private router:Router,private gostService: GostService,private dostavaService:DostavaService) { }

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
    this.dostavaService.dohvatiMojeDostave(this.gostKor).subscribe((data: Dostava[])=>{
      this.sveMojeDostave = data;
      for(var i=0;i<this.sveMojeDostave.length;i++){
        const parsedDate = this.parseDateString(this.sveMojeDostave[i].vremeDostave);
        if(this.sveMojeDostave[i].status=="prihvacena" && parsedDate<new Date()){
          this.zavrsenePrihvacene.push(this.sveMojeDostave[i])
        }
        if(this.sveMojeDostave[i].status=="prihvacena" && parsedDate>new Date()){
          this.sveAktuelneDostave.push(this.sveMojeDostave[i])
        }
      }
      this.zavrsenePrihvacene = this.sortDostaveByVreme(this.zavrsenePrihvacene);
    })
  }
  parseDateString(dateString: string): Date {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes,seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes,seconds);
  }
  sortDostaveByVreme(dostave: Dostava[]): Dostava[] {
    return dostave.sort((a, b) => {
      const dateA = this.parseDateString(a.vremeDostave);
      const dateB = this.parseDateString(b.vremeDostave);
      
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      return 0;
    });
  }
  zavrsenePrihvacene:Dostava[]=[]
  sveMojeDostave:Dostava[]=[]
  sveAktuelneDostave:Dostava[]=[]
  gostKor:string=""
  gost:Gost= new Gost
  sviGosti:Gost[]=[]

  logout(){
    localStorage.removeItem('ulogovangost');
    this.router.navigate(['']);
  }

}
