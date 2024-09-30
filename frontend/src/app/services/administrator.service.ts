import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Administrator } from '../models/administrator';
import { Restoran } from '../models/restoran';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  login(kor_ime:string, lozinka:string){
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post<Administrator>(`${this.uri}/administratori/login`, data)
  }
  
}
