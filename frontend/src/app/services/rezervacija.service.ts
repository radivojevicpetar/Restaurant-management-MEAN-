import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  rezervisiSto(idRez:number,gost:string,restoran:string,adresa:string,datumVreme:string,brojLjudi:number,dodatniZahtevi:string){
    const data = {
      idRez:idRez,
      gost: gost,
      restoran:restoran,
      adresa:adresa,
      datumVreme:datumVreme,
      brojLjudi:brojLjudi,
      dodatniZahtevi: dodatniZahtevi,
    }
    return this.http.post<Message>(`${this.uri}/rezervacije/rezervisiSto`, data)
  }
  prihvatiRezervaciju(idRez:number,restoran:string,konobar:string,datumVremeOdlaska:string,idSto:number){
    const data = {
      idRez:idRez,
      restoran:restoran,
      konobar:konobar,
      datumVremeOdlaska:datumVremeOdlaska,
      idSto:idSto
    }
    return this.http.post<Message>(`${this.uri}/rezervacije/prihvatiRezervaciju`, data)
  }
  odbijRezervaciju(idRez:number,restoran:string,komentar:string){
    const data = {
      idRez:idRez,
      restoran:restoran,
      komentar:komentar,
    }
    return this.http.post<Message>(`${this.uri}/rezervacije/odbijRezervaciju`, data)
  }
  cekirajPojavljivanje(idRez:number,restoran:string){
    const data = {
      idRez:idRez,
      restoran:restoran
    }
    return this.http.post<Message>(`${this.uri}/rezervacije/cekirajPojavljivanje`, data)
  }
  cekirajNepojavljivanje(idRez:number,restoran:string){
    const data = {
      idRez:idRez,
      restoran:restoran
    }
    return this.http.post<Message>(`${this.uri}/rezervacije/cekirajNepojavljivanje`, data)
  }
  otkaziRezervaciju(idRez:number,restoran:string){
    const data = {
      idRez:idRez,
      restoran:restoran
    }
    return this.http.post<Message>(`${this.uri}/rezervacije/otkaziRezervaciju`, data)
  }
  produziBoravak(idRez:number,restoran:string,datumVremeOdlaska:string){
    const data = {
      idRez:idRez,
      restoran:restoran,
      datumVremeOdlaska:datumVremeOdlaska
    }
    return this.http.post<Message>(`${this.uri}/rezervacije/produziBoravak`, data)
  }
  ostaviOcenu(idRez:number,restoran:string,komentar:string,ocena:number){
    const data = {
      idRez:idRez,
      restoran:restoran,
      komentar:komentar,
      ocena:ocena
    }
    return this.http.post<Message>(`${this.uri}/rezervacije/ostaviOcenu`, data)
  }
  dohvatiSveRezervacije(){
    return this.http.get<Rezervacija[]>(`${this.uri}/rezervacije/dohvatiSveRezervacije`)
  }
  dohvatiSveRezervacijeZaRestoran(restoran:string){
    const data={
      restoran:restoran
    }
    return this.http.post<Rezervacija[]>(`${this.uri}/rezervacije/dohvatiSveRezervacijeZaRestoran`,data)
  }
  dohvatiSveRezervacijeZaGosta(gost:string){
    const data={
      gost:gost
    }
    return this.http.post<Rezervacija[]>(`${this.uri}/rezervacije/dohvatiSveRezervacijeZaGosta`,data)
  }
  dohvatiSveRezervacijeZaKonobara(konobar:string){
    const data={
      konobar:konobar
    }
    return this.http.post<Rezervacija[]>(`${this.uri}/rezervacije/dohvatiSveRezervacijeZaKonobara`,data)
  }
}
