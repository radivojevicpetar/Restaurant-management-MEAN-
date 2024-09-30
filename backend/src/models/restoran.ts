import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Restoran = new Schema({   
    naziv: {
        type: String
    },
    tip:{
        type: String
    },
    opis:{
        type: String
    },
    adresa:{
        type: String
    },
    kontakt:{
        type: Number
    },
    ocena:{
        type:Number
    },
    radno_vreme:{
        type:Array
    },
    jelovnik:{
        type:Array
    }
})

export default mongoose.model('RestoranModel', Restoran, 'restorani')