import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Konobar = new Schema({
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
    status:{
        type:String
    },
    restoran:{
        type:String
    }
    
})

export default mongoose.model('KonobarModel', Konobar, 'konobari')