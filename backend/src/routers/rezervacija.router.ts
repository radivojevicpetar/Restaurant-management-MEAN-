import  express  from 'express'
import { RestoranController } from '../controllers/restoran.controller';
import { RezervacijaController } from '../controllers/rezervacija.controller';



const rezervacijaRouter = express.Router();

rezervacijaRouter.route('/rezervisiSto').post(
    (req, res)=>new RezervacijaController().rezervisiSto(req, res)
)
rezervacijaRouter.route('/dohvatiSveRezervacije').get(
    (req, res)=>new RezervacijaController().dohvatiSveRezervacije(req, res)
)
rezervacijaRouter.route('/dohvatiSveRezervacijeZaRestoran').post(
    (req, res)=>new RezervacijaController().dohvatiSveRezervacijeZaRestoran(req, res)
)
rezervacijaRouter.route('/dohvatiSveRezervacijeZaGosta').post(
    (req, res)=>new RezervacijaController().dohvatiSveRezervacijeZaGosta(req, res)
)
rezervacijaRouter.route('/dohvatiSveRezervacijeZaKonobara').post(
    (req, res)=>new RezervacijaController().dohvatiSveRezervacijeZaKonobara(req, res)
)
rezervacijaRouter.route('/prihvatiRezervaciju').post(
    (req, res)=>new RezervacijaController().prihvatiRezervaciju(req, res)
)
rezervacijaRouter.route('/odbijRezervaciju').post(
    (req, res)=>new RezervacijaController().odbijRezervaciju(req, res)
)
rezervacijaRouter.route('/cekirajPojavljivanje').post(
    (req, res)=>new RezervacijaController().cekirajPojavljivanje(req, res)
)
rezervacijaRouter.route('/cekirajNepojavljivanje').post(
    (req, res)=>new RezervacijaController().cekirajNepojavljivanje(req, res)
)
rezervacijaRouter.route('/produziBoravak').post(
    (req, res)=>new RezervacijaController().produziBoravak(req, res)
)
rezervacijaRouter.route('/otkaziRezervaciju').post(
    (req, res)=>new RezervacijaController().otkaziRezervaciju(req, res)
)
rezervacijaRouter.route('/ostaviOcenu').post(
    (req, res)=>new RezervacijaController().ostaviOcenu(req, res)
)



export default rezervacijaRouter