import  express  from 'express'
import { RestoranController } from '../controllers/restoran.controller';



const restoranRouter = express.Router();

restoranRouter.route('/dodajRestoran').post(
    (req, res)=>new RestoranController().dodajRestoran(req, res)
)

restoranRouter.route('/dohvatiSveRestorane').get(
    (req, res)=>new RestoranController().dohvatiSveRestorane(req, res)
)
restoranRouter.route('/dodajRadnoVreme').post(
    (req, res)=>new RestoranController().dodajRadnoVreme(req, res)
)
restoranRouter.route('/sacuvajJelo').post(
    (req, res)=>new RestoranController().sacuvajJelo(req, res)
)
restoranRouter.route('/pretraziRestorane').get(
    (req, res)=>new RestoranController().pretraziRestorane(req, res)
)
restoranRouter.route('/sortirajPoNazivu').get(
    (req, res)=>new RestoranController().sortirajPoNazivu(req, res)
)
restoranRouter.route('/sortirajPoTipu').get(
    (req, res)=>new RestoranController().sortirajPoTipu(req, res)
)
restoranRouter.route('/sortirajPoAdresi').get(
    (req, res)=>new RestoranController().sortirajPoAdresi(req, res)
)
restoranRouter.route('/dohvatiRestoran').post(
    (req, res)=>new RestoranController().dohvatiRestoran(req, res)
)
restoranRouter.route('/dodajRaspored').post(
    (req, res)=>new RestoranController().dodajRaspored(req, res)
)
restoranRouter.route('/dohvatiRaspored').post(
    (req, res)=>new RestoranController().dohvatiRaspored(req, res)
)

export default restoranRouter