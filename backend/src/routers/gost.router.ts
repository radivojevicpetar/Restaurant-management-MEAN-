import  express  from 'express'
import { GostController } from '../controllers/gost.controller';


const gostRouter = express.Router();

gostRouter.route('/login').post(
    (req, res)=>new GostController().login(req, res)
)
gostRouter.route('/registracija').post(
    (req, res)=>new GostController().registracija(req, res)
)
gostRouter.route('/izmeniPodatke').post(
    (req, res)=>new GostController().izmeniPodatke(req, res)
)
gostRouter.route('/promeniLozinku').post(
    (req, res)=>new GostController().promeniLozinku(req, res)
)
gostRouter.route('/proveriPitanje').post(
    (req, res)=>new GostController().proveriPitanje(req, res)
)
gostRouter.route('/odobriGosta').post(
    (req, res)=>new GostController().odobriGosta(req, res)
)
gostRouter.route('/odbijGosta').post(
    (req, res)=>new GostController().odbijGosta(req, res)
)
gostRouter.route('/dodajOdbijenog').post(
    (req, res)=>new GostController().dodajOdbijenog(req, res)
)
gostRouter.route('/obrisiGosta').post(
    (req, res)=>new GostController().obrisiGosta(req, res)
)
gostRouter.route('/dohvatiGosta').post(
    (req, res)=>new GostController().dohvatiGosta(req, res)
)
gostRouter.route('/dohvatiSveOdbijene').get(
    (req, res)=>new GostController().dohvatiSveOdbijene(req, res)
)
gostRouter.route('/dohvatiSveGoste').get(
    (req, res)=>new GostController().dohvatiSveGoste(req, res)
)
gostRouter.route('/blokirajGosta').get(
    (req, res)=>new GostController().blokirajGosta(req, res)
)
gostRouter.route('/odblokirajGosta').get(
    (req, res)=>new GostController().odblokirajGosta(req, res)
)

export default gostRouter