import  express  from 'express'
import { KonobarController } from '../controllers/konobar.controller';

const konobarRouter = express.Router();

konobarRouter.route('/login').post(
    (req, res)=>new KonobarController().login(req, res)
)
konobarRouter.route('/registracija').post(
    (req, res)=>new KonobarController().registracija(req, res)
)
konobarRouter.route('/izmeniPodatke').post(
    (req, res)=>new KonobarController().izmeniPodatke(req, res)
)
konobarRouter.route('/dohvatiSveKonobare').get(
    (req, res)=>new KonobarController().dohvatiSveKonobare(req, res)
)
konobarRouter.route('/dohvatiKonobara').post(
    (req, res)=>new KonobarController().dohvatiKonobara(req, res)
)
konobarRouter.route('/promeniLozinku').post(
    (req, res)=>new KonobarController().promeniLozinku(req, res)
)

export default konobarRouter