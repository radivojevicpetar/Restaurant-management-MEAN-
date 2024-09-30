import  express  from 'express'
import RezervacijaModel from '../models/rezervacija'


export class RezervacijaController{

    rezervisiSto = (req: express.Request, res: express.Response)=>{
        let rezervacija=new RezervacijaModel({
            idRez:req.body.idRez,
            gost:req.body.gost,
            restoran:req.body.restoran,
            adresa:req.body.adresa,
            datumVreme:req.body.datumVreme,
            brojLjudi:req.body.brojLjudi,
            dodatniZahtevi:req.body.dodatniZahtevi,
            status:"poslata"
        })
        rezervacija.save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    dohvatiSveRezervacije = (req: express.Request, res: express.Response)=>{
        RezervacijaModel.find({}).then((rezervacija)=>{
            res.json(rezervacija)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dohvatiSveRezervacijeZaRestoran = (req: express.Request, res: express.Response)=>{
        let restoran=req.body.restoran;
        RezervacijaModel.find({'restoran':restoran}).then((rezervacija)=>{
            res.json(rezervacija)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dohvatiSveRezervacijeZaGosta = (req: express.Request, res: express.Response)=>{
        let gost=req.body.gost;
        RezervacijaModel.find({'gost':gost}).then((rezervacija)=>{
            res.json(rezervacija)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dohvatiSveRezervacijeZaKonobara = (req: express.Request, res: express.Response)=>{
        let konobar=req.body.konobar;
        let status="pojavio"
        RezervacijaModel.find({'konobar':konobar,'status':status}).then((rezervacija)=>{
            res.json(rezervacija)
        }).catch((err)=>{
            console.log(err)
        })
    }
    prihvatiRezervaciju = (req: express.Request, res: express.Response) => {
        let idRez = req.body.idRez;
        let restoran = req.body.restoran;
        let konobar=req.body.konobar
        let datumVremeOdlaska=req.body.datumVremeOdlaska
        let idSto=req.body.idSto
        let status="prihvacena"

        RezervacijaModel.updateOne({ 'idRez': idRez,'restoran':restoran},{ 
            $set: {'status':status,'datumVremeOdlaska':datumVremeOdlaska,'konobar':konobar,'idStola':idSto}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }
    odbijRezervaciju = (req: express.Request, res: express.Response) => {
        let idRez = req.body.idRez;
        let restoran = req.body.restoran;
        let komentar=req.body.komentar
        let status="odbijena"

        RezervacijaModel.updateOne({ 'idRez': idRez,'restoran':restoran},{ 
            $set: {'status':status,'komentar':komentar}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }
    cekirajPojavljivanje = (req: express.Request, res: express.Response) => {
        let idRez = req.body.idRez;
        let restoran = req.body.restoran;
        let status="pojavio"

        RezervacijaModel.updateOne({ 'idRez': idRez,'restoran':restoran},{ 
            $set: {'status':status}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }
    cekirajNepojavljivanje = (req: express.Request, res: express.Response) => {
        let idRez = req.body.idRez;
        let restoran = req.body.restoran;
        let status="nijepojavio"

        RezervacijaModel.updateOne({ 'idRez': idRez,'restoran':restoran},{ 
            $set: {'status':status}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }
    otkaziRezervaciju = (req: express.Request, res: express.Response) => {
        let idRez = req.body.idRez;
        let restoran = req.body.restoran;
        let status="otkazana"

        RezervacijaModel.updateOne({ 'idRez': idRez,'restoran':restoran},{ 
            $set: {'status':status}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }
    produziBoravak = (req: express.Request, res: express.Response) => {
        let idRez = req.body.idRez;
        let restoran = req.body.restoran;
        let datumVremeOdlaska=req.body.datumVremeOdlaska
        RezervacijaModel.updateOne({ 'idRez': idRez,'restoran':restoran},{ 
            $set: {'datumVremeOdlaska':datumVremeOdlaska}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }
    ostaviOcenu = (req: express.Request, res: express.Response) => {
        let idRez = req.body.idRez;
        let restoran = req.body.restoran;
        let komentar=req.body.komentar;
        let ocena=req.body.ocena;
        RezervacijaModel.updateOne({ 'idRez': idRez,'restoran':restoran},{ 
            $set: {'komentar':komentar,'ocena':ocena}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }


}