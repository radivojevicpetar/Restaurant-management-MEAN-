import  express  from 'express'
import { AdministratorController } from '../controllers/administrator.controller';


const administratorRouter = express.Router();

administratorRouter.route('/login').post(
    (req, res)=>new AdministratorController().login(req, res)
)


export default administratorRouter