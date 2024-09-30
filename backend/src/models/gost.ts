import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Gost = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    bezb_pitanje:{
        type:String
    },
    bezb_odgovor:{
        type:String
    },
    mejl:{
        type: String
    },
    telefon:{
        type: Number
    },  
    adresa:{
        type:String
    },
    img:{
        type:String
    },
    broj_kartice:{
        type:Number
    },
    status:{
        type:String
    }
    
})

export default mongoose.model('GostModel', Gost, 'gosti')