import  express  from 'express'
import { DostavaController } from '../controllers/dostava.controller';



const dostavaRouter = express.Router();

dostavaRouter.route('/novaKorpa').post(
    (req, res)=>new DostavaController().novaKorpa(req, res)
)
dostavaRouter.route('/dohvatiKorpu').post(
    (req, res)=>new DostavaController().dohvatiKorpu(req, res)
)
dostavaRouter.route('/dodajKorpa').post(
    (req, res)=>new DostavaController().dodajKorpa(req, res)
)
dostavaRouter.route('/obrisiKorpa').post(
    (req, res)=>new DostavaController().obrisiKorpa(req, res)
)
dostavaRouter.route('/posaljiDostavu').post(
    (req, res)=>new DostavaController().posaljiDostavu(req, res)
)
dostavaRouter.route('/dohvatiSveDostave').post(
    (req, res)=>new DostavaController().dohvatiSveDostave(req, res)
)
dostavaRouter.route('/dohvatiAktuelneDostave').post(
    (req, res)=>new DostavaController().dohvatiAktuelneDostave(req, res)
)
dostavaRouter.route('/dohvatiMojeDostave').post(
    (req, res)=>new DostavaController().dohvatiMojeDostave(req, res)
)
dostavaRouter.route('/odbijDostavu').post(
    (req, res)=>new DostavaController().odbijDostavu(req, res)
)
dostavaRouter.route('/prihvatiDostavu').post(
    (req, res)=>new DostavaController().prihvatiDostavu(req, res)
)

export default dostavaRouter