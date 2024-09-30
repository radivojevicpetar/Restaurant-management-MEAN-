import  express  from 'express'
import AdministratorModel from '../models/administrator'


export class AdministratorController{

    login = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        AdministratorModel.findOne({'kor_ime': kor_ime, 'lozinka': lozinka}).then((administrator) => {
            if (!administrator) {
                return res.status(404).json({ error: "Korisnik ne postoji" });
            }
            res.json(administrator)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Greška prilikom pretraživanja korisnika" });
        });
    }
}