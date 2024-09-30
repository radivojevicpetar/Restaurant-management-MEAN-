import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Konobar } from '../models/konobar';

@Injectable({
  providedIn: 'root'
})
export class KonobarService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  login(kor_ime:string, lozinka:string){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post<Konobar>(`${this.uri}/konobari/login`, data)
  }
  promeniLozinku(lozinkaNova:string,kor_ime:string){
    const data={
      kor_ime:kor_ime,
      lozinkaNova:lozinkaNova
    }   
    return this.http.post<Message>(`${this.uri}/konobari/promeniLozinku`, data);
  }
  izmeniPodatke(kor_ime:string,ime:string,prezime:string,pol:string,mejl:string,telefon:number,adresa:string,img:any,restoran:string){
    const data = {
      kor_ime: kor_ime,
      ime:ime,
      prezime:prezime,
      pol:pol,
      mejl: mejl,
      telefon: telefon,
      adresa: adresa,
      img:img,
      restoran:restoran
    }
    return this.http.post<Message>(`${this.uri}/konobari/izmeniPodatke`, data)
  }
  registracija(ime:string, prezime:string,kor_ime:string, lozinka:string,bezb_pitanje:string,bezb_odgovor:string,pol:string,adresa:string, mejl:string, telefon:number,status:string,img:string,restoran:string){
    const data = {
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      bezb_pitanje: bezb_pitanje,
      bezb_odgovor: bezb_odgovor,
      pol:pol,
      adresa: adresa,
      mejl: mejl,
      telefon: telefon,
      status:status,
      img:img,
      restoran: restoran
    }
    return this.http.post<Message>(`${this.uri}/konobari/registracija`, data)
  }
  obrisiKonobara(kor_ime:string){
    const data={
      kor_ime:kor_ime,
    }   
    return this.http.post<Message>(`${this.uri}/konobari/obrisiKonobara`, data);
  }
  proveriPitanje(kor_ime:string, izabranoPitanje:string,bezb_odgovor:string){
    const data = {
      kor_ime: kor_ime,
      izabranoPitanje: izabranoPitanje,
      bezb_odgovor:bezb_odgovor
    }
    return this.http.post<Message>(`${this.uri}/konobari/proverPitanje`, data)
  }
  dohvatiSveKonobare(){
    return this.http.get<Konobar[]>(`${this.uri}/konobari/dohvatiSveKonobare`)
  }
  dohvatiKonobara(kor_ime:string){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post<Konobar>(`${this.uri}/konobari/dohvatiKonobara`,data)
  }
}
