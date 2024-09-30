import mongoose from "mongoose";


const Schema = mongoose.Schema;
let Raspored=new Schema({
    restoran:{
        type:String
    },
    kuhinja:{
        type: Array
    },
    toalet:{
        type: Array
    },
    stolovi:{
        type: Array
    },
   
})
export default mongoose.model('RasporedModel',Raspored,'rasporedi')