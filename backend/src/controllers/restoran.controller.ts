import  express  from 'express'
import RestoranModel from '../models/restoran'
import RasporedModel from '../models/raspored'
import restoran from '../models/restoran'


export class RestoranController{

    dodajRestoran = (req: express.Request, res: express.Response)=>{
        let restoran=new RestoranModel({
            naziv:req.body.naziv,
            tip:req.body.tip,
            opis:req.body.opis,
            adresa:req.body.adresa,
            kontakt:req.body.kontakt,
            radno_vreme:req.body.radno_vreme,
            jelovnik:req.body.jelovnik
        })
        restoran.save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    dodajRaspored = (req: express.Request, res: express.Response)=>{
        const jsonData = req.body.jsonData;
        const naziv= req.body.naziv;
        jsonData.restoran = naziv;
        let raspored=new RasporedModel(jsonData)
        raspored.save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }

    dohvatiSveRestorane = (req: express.Request, res: express.Response)=>{
        RestoranModel.find({}).then((restoran)=>{
            res.json(restoran)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dodajRadnoVreme=(req:express.Request,res:express.Response)=>{
        let naziv=req.body.naziv;
        let radno_vreme=req.body.radno_vreme;
        RestoranModel.updateOne({'naziv': naziv}, {$set: {'radno_vreme': radno_vreme}}).then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    sacuvajJelo=(req:express.Request,res:express.Response)=>{
        let naziv=req.body.naziv;
        let jelovnik=req.body.jelovnik;
        RestoranModel.updateOne({'naziv': naziv}, {$set: {'jelovnik': jelovnik}}).then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    dohvatiRestoran = (req: express.Request, res: express.Response)=>{
        let naziv=req.body.naziv;
        RestoranModel.findOne({'naziv': naziv}).then((restoran)=>{
            res.json(restoran)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dohvatiRaspored = (req: express.Request, res: express.Response)=>{
        let naziv=req.body.naziv;
        RasporedModel.findOne({'naziv': naziv}).then((restoran)=>{
            res.json(restoran)
        }).catch((err)=>{
            console.log(err)
        })
    }
    pretraziRestorane= (req: express.Request, res: express.Response)=>{
        let naziv=req.query.param1;
        let tip=req.query.param2;
        let adresa=req.query.param3;
        if(naziv=="undefined" && tip=="undefined" ){
            RestoranModel.find({'adresa':{$regex:adresa}}).then((restoran)=>{
                res.json(restoran)
            }).catch((err)=>{
                console.log(err)
            })
        }
        if (naziv=="undefined" && adresa=="undefined") {
            RestoranModel.find({'tip':{$regex:tip}}).then((restoran)=>{
                res.json(restoran)
            }).catch((err)=>{
                console.log(err)
            })
        }
        if (tip=="undefined" && adresa=="undefined") {
            RestoranModel.find({'naziv':{$regex:naziv}}).then((restoran)=>{
                res.json(restoran)
            }).catch((err)=>{
                console.log(err)
            })
        }
        if (naziv=="undefined" && tip!="undefined" && adresa!="undefined"){
            RestoranModel.find({'adresa': {$regex: adresa},'tip':{$regex:tip}}).then((restoran)=>{
                res.json(restoran)
            }).catch((err)=>{
                console.log(err)
            })
        }
        if (naziv!="undefined" && tip=="undefined" && adresa!="undefined"){
            RestoranModel.find({'adresa': {$regex: adresa},'naziv':{$regex:naziv}}).then((restoran)=>{
                res.json(restoran)
            }).catch((err)=>{
                console.log(err)
            })
        }
        if (naziv!="undefined" && tip!="undefined" && adresa=="undefined"){
            RestoranModel.find({'naziv': {$regex: naziv},'tip':{$regex:tip}}).then((restoran)=>{
                res.json(restoran)
            }).catch((err)=>{
                console.log(err)
            })
        }
        if (naziv!="undefined" && tip!="undefined" && adresa!="undefined"){
            RestoranModel.find({'naziv': {$regex:naziv},'tip':{$regex:tip},'adresa':{$regex:adresa}}).then((restoran)=>{
                res.json(restoran)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    sortirajPoNazivu = (req: express.Request, res: express.Response)=>{
        const opadajuce = req.query.param1 === 'true';
        RestoranModel.find({}).then(restoran => {
        restoran.sort((a, b) => {
            const nazivA = a.naziv ?? '';  // Default to empty string if null/undefined
            const nazivB = b.naziv ?? ''; 
            if (opadajuce) {
                return nazivB.localeCompare(nazivA);
            } else {
                return nazivA.localeCompare(nazivB);
            }
        });
        res.json(restoran);
        }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
        });
     }
     sortirajPoTipu = (req: express.Request, res: express.Response)=>{
        const opadajuce = req.query.param1 === 'true';
        RestoranModel.find({}).then(restoran => {
        restoran.sort((a, b) => {
            const tipA = a.tip ?? '';  // Default to empty string if null/undefined
            const tipB = b.tip ?? ''; 
            if (opadajuce) {
                return tipB.localeCompare(tipA);
            } else {
                return tipA.localeCompare(tipB);
            }
        });
        res.json(restoran);
        }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
        });
     }
     sortirajPoAdresi = (req: express.Request, res: express.Response)=>{
        const opadajuce = req.query.param1 === 'true';
        RestoranModel.find({}).then(restoran => {
        restoran.sort((a, b) => {
            const adresaA = a.adresa ?? '';  // Default to empty string if null/undefined
            const adresaB = b.adresa ?? ''; 
            if (opadajuce) {
                return adresaB.localeCompare(adresaA);
            } else {
                return adresaA.localeCompare(adresaB);
            }
        });
        res.json(restoran);
        }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
        });
     }
}