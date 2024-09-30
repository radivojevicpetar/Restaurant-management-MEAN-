import { Time } from "@angular/common";
import { Radno_vreme } from "./radno_vreme";
import { Jelo } from "./jelo";

export class Restoran{
    naziv: string="";
    tip: string="";
    adresa: string="";
    opis: string="";
    kontakt:number=0;
    ocena:number=0;
    radno_vreme ? : Array<Radno_vreme>=[];
    jelovnik : Array<Jelo>=[];
}