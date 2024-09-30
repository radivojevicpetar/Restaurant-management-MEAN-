import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import konobarRouter from './routers/konobar.router';
import gostRouter from './routers/gost.router';
import administratorRouter from './routers/administrator.router';
import restoranRouter from './routers/restoran.router';
import rezervacijaRouter from './routers/rezervacija.router';
import dostavaRouter from './routers/dostava.router';


const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Restorani')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/konobari', konobarRouter)
router.use('/gosti', gostRouter)
router.use('/odbijeni', gostRouter)
router.use('/administratori', administratorRouter)
router.use('/restorani', restoranRouter),
router.use('/rezervacije', rezervacijaRouter)
router.use('/dostave', dostavaRouter)



app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));