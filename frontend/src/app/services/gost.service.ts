import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { Gost } from '../models/gost';
import { Odbijeni } from '../models/odbijeni';

@Injectable({
  providedIn: 'root'
})
export class GostService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  registracija(ime:string, prezime:string,pol:string, kor_ime:string, lozinka:string,bezb_pitanje:string,bezb_odgovor:string,adresa:string, mejl:string, telefon:number,status:string,img:string,broj_kartice:number){
    const data = {
      ime: ime,
      prezime: prezime,
      pol:pol,
      kor_ime: kor_ime,
      lozinka: lozinka,
      bezb_pitanje: bezb_pitanje,
      bezb_odgovor: bezb_odgovor,
      adresa: adresa,
      mejl: mejl,
      telefon: telefon,
      status:status,
      img:img,
      broj_kartice: broj_kartice
    }
    return this.http.post<Message>(`${this.uri}/gosti/registracija`, data)
  }
  login(kor_ime:string, lozinka:string){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post<Gost>(`${this.uri}/gosti/login`, data)
  }
  proveriPitanje(kor_ime:string, izabranoPitanje:string,bezb_odgovor:string){
    const data = {
      kor_ime: kor_ime,
      izabranoPitanje: izabranoPitanje,
      bezb_odgovor:bezb_odgovor
    }
    return this.http.post<Message>(`${this.uri}/gosti/proveriPitanje`, data)
  }
  dodajOdbijenog(kor_ime:string, mejl:string){
    const data = {
      kor_ime: kor_ime,
      mejl: mejl,
    }
    return this.http.post<Message>(`${this.uri}/gosti/dodajOdbijenog`, data)
  }
  izmeniPodatke(kor_ime:string,ime:string,prezime:string,pol:string,mejl:string,telefon:number,adresa:string,img:any,broj_kartice:number){
    const data = {
      kor_ime: kor_ime,
      ime:ime,
      prezime:prezime,
      pol:pol,
      mejl: mejl,
      telefon: telefon,
      adresa: adresa,
      img:img,
      broj_kartice:broj_kartice
    }
    return this.http.post<Message>(`${this.uri}/gosti/izmeniPodatke`, data)
  }
  odobriGosta(kor_ime:string){
    const data = {
      kor_ime: kor_ime,
    }
    return this.http.post<Message>(`${this.uri}/gosti/odobriGosta`, data)
  }
  odblokirajGosta(kor_ime:string){
    const data = {
      kor_ime: kor_ime,
    }
    return this.http.post<Message>(`${this.uri}/gosti/odblokirajGosta`, data)
  }
  blokirajGosta(kor_ime:string){
    const data = {
      kor_ime: kor_ime,
    }
    return this.http.post<Message>(`${this.uri}/gosti/blokirajGosta`, data)
  }
  obrisiGosta(kor_ime:string){
    const data={
      kor_ime:kor_ime,
    }   
    return this.http.post<Message>(`${this.uri}/gosti/obrisiGosta`, data);
  }
  odbijGosta(kor_ime:string){
    const data = {
      kor_ime: kor_ime,
    }
    return this.http.post<Message>(`${this.uri}/gosti/odbijGosta`, data)
  }
  dohvatiSveOdbijene(){
    return this.http.get<Odbijeni[]>(`${this.uri}/odbijeni/dohvatiSveOdbijene`)
  }
  dohvatiSveGoste(){
    return this.http.get<Gost[]>(`${this.uri}/gosti/dohvatiSveGoste`)
  }
  dohvatiGosta(kor_ime:string){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post<Gost>(`${this.uri}/gosti/dohvatiGosta`,data)
  }
  promeniLozinku(lozinkaNova:string,kor_ime:string){
    const data={
      kor_ime:kor_ime,
      lozinkaNova:lozinkaNova
    }   
    return this.http.post<Message>(`${this.uri}/gosti/promeniLozinku`, data);
  }
}
