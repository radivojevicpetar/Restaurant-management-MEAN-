import { Jelo } from "./jelo";

export class Dostava{
    gost: string="";
    restoran: string="";
    vremeDostave: string=""
    status: string="";
    narudzbina:Array<Jelo>=[];
    iznosRacuna:number=0
}