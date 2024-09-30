import { Component } from '@angular/core';
import { AdministratorService } from '../services/administrator.service';
import { Router } from '@angular/router';
import { Administrator } from '../models/administrator';

@Component({
  selector: 'app-login-administrator',
  templateUrl: './login-administrator.component.html',
  styleUrls: ['./login-administrator.component.css']
})
export class LoginAdministratorComponent {

  constructor(private administratorService:AdministratorService,private router: Router) { }

  ngOnInit(): void {
  }
  kor_ime:string=""
  lozinka:string=""
  message:string=""

  nazad(){
    this.router.navigate(['']);
  }

  login (){
    
    this.administratorService.login(this.kor_ime, this.lozinka).subscribe((administrator: Administrator)=>{
      if(administrator!=null){
        localStorage.setItem('ulogovanadministrator', JSON.stringify(administrator));
        this.router.navigate(['administrator']);
      }
      else{
        this.message="Korisnik ne postoji"
      }

  });
}

}
