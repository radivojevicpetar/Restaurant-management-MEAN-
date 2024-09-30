import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Rezervacija = new Schema({  
    idRez:{
        type:Number
    },
    gost: {
        type: String
    },
    restoran:{
        type: String
    },
    adresa:{
        type: String
    },
    datumVreme:{
        type: String
    },
    datumVremeOdlaska:{
        type: String
    },
    brojLjudi:{
        type: Number
    },
    dodatniZahtevi:{
        type: String
    },
    status:{
        type:String
    },
    idStola:{
        type:Number
    },
    komentar:{
        type:String
    },
    ocena:{
        type:Number
    },
    konobar:{
        type:String
    }
})

export default mongoose.model('RezervacijaModel', Rezervacija, 'rezervacije')