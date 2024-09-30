import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Odbijeni = new Schema({   
    kor_ime: {
        type: String
    },
    mejl:{
        type: String
    }
})

export default mongoose.model('OdbijeniModel', Odbijeni, 'odbijeni')