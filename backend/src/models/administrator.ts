import mongoose from "mongoose";


const Schema = mongoose.Schema;

let Administrator = new Schema({   
    kor_ime: {
        type: String
    },
    lozinka:{
        type: String
    }
})

export default mongoose.model('AdministratorModel', Administrator, 'administratori')