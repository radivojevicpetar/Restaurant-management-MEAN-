import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restoran } from '../models/restoran';
import { Message } from '../models/message';
import { Radno_vreme } from '../models/radno_vreme';
import { Jelo } from '../models/jelo';
import { Raspored } from '../models/restoran-raspored';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  dohvatiSveRestorane(){
    return this.http.get<Restoran[]>(`${this.uri}/restorani/dohvatiSveRestorane`)
  }
  dodajRestoran(naziv:string,tip:string,opis:string,adresa:string,kontakt:number,radno_vreme:Array<Radno_vreme>,jelovnik:Array<Jelo>){
    const data = {
      naziv: naziv,
      tip:tip,
      opis:opis,
      adresa:adresa,
      kontakt: kontakt,
      radno_vreme:radno_vreme,
      jelovnik:jelovnik
    }
    return this.http.post<Message>(`${this.uri}/restorani/dodajRestoran`, data)
  }
  dodajRadnoVreme(naziv:string,radno_vreme:Array<Radno_vreme>){
    const data={
      naziv:naziv,
      radno_vreme:radno_vreme
      
    }   
    return this.http.post<Message>(`${this.uri}/restorani/dodajRadnoVreme`, data);
  }
  dodajRaspored(jsonData:JSON,naziv:string){
    const data={
      jsonData:jsonData,
      naziv:naziv
    }
    return this.http.post<Message>(`${this.uri}/restorani/dodajRaspored`,data)
  }
  sacuvajJelo(naziv:string,jelovnik :Array<Jelo>){
    const data={
      naziv:naziv,
      jelovnik:jelovnik
      
    }   
    return this.http.post<Message>(`${this.uri}/restorani/sacuvajJelo`, data);
  }
  dohvatiRestoran(naziv:string){
    const data={
      naziv:naziv
    }
    return this.http.post<Restoran>(`${this.uri}/restorani/dohvatiRestoran`,data)
  }
  dohvatiRaspored(restoran:string){
    const data={
      restoran:restoran
    }
    return this.http.post<Raspored>(`${this.uri}/restorani/dohvatiRaspored`,data)
  }

  pretraziRestorane(searchParam1:string,searchParam2:string,searchParam3:string){
    return this.http.get<Restoran[]>(`${this.uri}/restorani/pretraziRestorane?param1=${searchParam1}&param2=${searchParam2}&param3=${searchParam3}`)
  }
  sortirajPoNazivu(opadajuce:boolean){
    return this.http.get<Restoran[]>(`${this.uri}/restorani/sortirajPoNazivu?param1=${opadajuce}`)
  }
  sortirajPoTipu(opadajuce:boolean){
    return this.http.get<Restoran[]>(`${this.uri}/restorani/sortirajPoTipu?param1=${opadajuce}`)
  }
  sortirajPoAdresi(opadajuce:boolean){
    return this.http.get<Restoran[]>(`${this.uri}/restorani/sortirajPoAdresi?param1=${opadajuce}`)
  }
}
