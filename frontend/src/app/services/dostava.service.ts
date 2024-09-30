import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Dostava } from '../models/dostava';
import { Jelo } from '../models/jelo';

@Injectable({
  providedIn: 'root'
})
export class DostavaService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  dohvatiKorpu(kor_ime:string,status:string){
    const data={
      kor_ime:kor_ime,
      status:status
    }
    return this.http.post<Dostava>(`${this.uri}/dostave/dohvatiKorpu`,data)
  }

  novaKorpa(gost:string,restoran:string,vremeDostave:string|null,status:string,narudzbina:Array<Jelo>){
    const data = {
      gost: gost,
      restoran:restoran,
      vremeDostave:vremeDostave,
      status:status,
      narudzbina:narudzbina,
    }
    console.log('Sending data:', data);
    return this.http.post<Message>(`${this.uri}/dostave/novaKorpa`, data)
  }
  dodajKorpa(gost:string,vremeDostave:string|null,status:string,jelo:Jelo){
    const data = {
      gost: gost,
      vremeDostave:vremeDostave,
      status:status,
      jelo:jelo,
    }
    return this.http.post<Message>(`${this.uri}/dostave/dodajKorpa`, data)
  }
  obrisiKorpa(gost:string,vremeDostave:string|null,status:string,id:number){
    const data = {
      gost: gost,
      vremeDostave:vremeDostave,
      status:status,
      id:id,
    }
    return this.http.post<Message>(`${this.uri}/dostave/obrisiKorpa`, data)
  }
  posaljiDostavu(gost:string,vremeDostave:string|null,status:string,iznosRacuna:number){
    const data = {
      gost: gost,
      vremeDostave:vremeDostave,
      status:status,
      iznosRacuna:iznosRacuna
    }
    return this.http.post<Message>(`${this.uri}/dostave/posaljiDostavu`, data)
  }
  odbijDostavu(dostava:Dostava){
    const data = {
      dostava: dostava,
    }
    return this.http.post<Message>(`${this.uri}/dostave/odbijDostavu`, data)
  }
  prihvatiDostavu(dostava:Dostava,vremeDostave:string){
    const data = {
      dostava: dostava,
      vremeDostave:vremeDostave
    }
    return this.http.post<Message>(`${this.uri}/dostave/prihvatiDostavu`, data)
  }
  dohvatiSveDostave(restoran:string){
    const data={
      restoran:restoran
    }
    return this.http.post<Dostava[]>(`${this.uri}/dostave/dohvatiSveDostave`,data)
  }
  dohvatiAktuelneDostave(gost:string){
    const data={
      gost:gost
    }
    return this.http.post<Dostava[]>(`${this.uri}/dostave/dohvatiAktuelneDostave`,data)
  }
  dohvatiMojeDostave(gost:string){
    const data={
      gost:gost
    }
    return this.http.post<Dostava[]>(`${this.uri}/dostave/dohvatiMojeDostave`,data)
  }
}
