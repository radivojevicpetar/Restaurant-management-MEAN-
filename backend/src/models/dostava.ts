import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Dostava = new Schema({   
    gost: {
        type: String
    },
    restoran:{
        type: String
    },
    vremeDostave:{
        type: String
    },
    status:{
        type: String
    },
    narudzbina:{
        type: Array
    },
    iznosRacuna:{
        type: Number
    }
})

export default mongoose.model('DostavaModel', Dostava, 'dostave')