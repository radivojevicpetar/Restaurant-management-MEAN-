import  express  from 'express'
import GostModel from '../models/gost'
import OdbijeniModel from '../models/odbijeni'

const bcrypt = require('bcrypt');
const saltRounds = 10;

export class GostController{

    
    login = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        GostModel.findOne({ 'kor_ime': kor_ime }).then((gost) => {
            if (!gost) {
                return res.status(404).json({ error: "User not found" });
            }
    
            bcrypt.compare(lozinka, gost.lozinka, (err:any, result:any) => {
                if (err) {
                    return res.status(500).json({ error: "Error comparing passwords" });
                }
    
                if (result) {
                    // Passwords match
                    res.json(gost);
                } else {
                    // Passwords do not match
                    res.status(401).json({ error: "Invalid credentials" });
                }
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error finding user" });
        });
    }
    proveriPitanje = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let izabranoPitanje = req.body.izabranoPitanje;
        let bezb_odgovor=req.body.bezb_odgovor;
        GostModel.findOne({ 'kor_ime': kor_ime,'bezb_pitanje':izabranoPitanje,'bezb_odgovor':bezb_odgovor }).then(ok=> {
            res.json({message: "ok"});
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error finding user" });
        });
    }
    registracija = (req: express.Request, res: express.Response)=>{

        bcrypt.hash(req.body.lozinka, saltRounds, (err:any, hash:any) => {
            if (err) {
                return res.status(500).json({ error: "Error encrypting password" });
            }
        let gost = new GostModel({
            ime: req.body.ime,
            prezime: req.body.prezime,
            pol:req.body.pol,
            kor_ime: req.body.kor_ime,
            lozinka: hash,
            bezb_pitanje: req.body.bezb_pitanje,
            bezb_odgovor:req.body.bezb_odgovor,
            adresa: req.body.adresa,
            mejl: req.body.mejl,
            telefon: req.body.telefon,
            img: req.body.img,
            status:req.body.status,
            broj_kartice:req.body.broj_kartice
        })
        gost.save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    })
        
    }
    izmeniPodatke=(req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let pol=req.body.pol;
        let mejl=req.body.mejl;   
        let telefon=req.body.telefon;
        let adresa=req.body.adresa;
        let img=req.body.img;
        let broj_kartice=req.body.broj_kartice
        GostModel.updateOne({'kor_ime': kor_ime}, {$set: {'ime': ime,'prezime': prezime,'pol':pol,'mejl':mejl,'telefon':telefon,'adresa':adresa,'img': img,'broj_kartice':broj_kartice}}).then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    
    dohvatiSveGoste = (req: express.Request, res: express.Response)=>{
        GostModel.find({}).then((gost)=>{
            res.json(gost)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dohvatiGosta = (req: express.Request, res: express.Response)=>{
        let kor_ime=req.body.kor_ime;
        GostModel.findOne({'kor_ime': kor_ime}).then((gost)=>{
            res.json(gost)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dohvatiSveOdbijene = (req: express.Request, res: express.Response)=>{
        OdbijeniModel.find({}).then((odbijeni)=>{
            res.json(odbijeni)
        }).catch((err)=>{
            console.log(err)
        })
    }
    promeniLozinku=(req:express.Request,res:express.Response)=>{
        
        let kor_ime=req.body.kor_ime;
        bcrypt.hash(req.body.lozinkaNova, saltRounds, (err:any, hash:any) => {
            if (err) {
                return res.status(500).json({ error: "Error encrypting password" });
            }
        GostModel.findOneAndUpdate({'kor_ime': kor_ime}, {$set: {'lozinka': hash}}).then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
        })
    }
     odobriGosta=(req:express.Request,res:express.Response)=>{
            let kor_ime=req.body.kor_ime;
            let odobren="odobren"
            GostModel.findOneAndUpdate({'kor_ime': kor_ime}, {$set: {'status': odobren}}).then(ok=>{
                console.log(odobren)
                res.json({message: "ok"})
            }).catch(err=>{
                console.log(err)
            })
        }
        blokirajGosta=(req:express.Request,res:express.Response)=>{
            let kor_ime=req.body.kor_ime;
            let blokiran="blokiran"
            GostModel.findOneAndUpdate({'kor_ime': kor_ime}, {$set: {'status': blokiran}}).then(ok=>{
                res.json({message: "ok"})
            }).catch(err=>{
                console.log(err)
            })
        }
        odblokirajGosta=(req:express.Request,res:express.Response)=>{
            let kor_ime=req.body.kor_ime;
            let odblokiran="odobren"
            GostModel.findOneAndUpdate({'kor_ime': kor_ime}, {$set: {'status': odblokiran}}).then(ok=>{
                res.json({message: "ok"})
            }).catch(err=>{
                console.log(err)
            })
        }
    odbijGosta=(req:express.Request,res:express.Response)=>{
            let kor_ime=req.body.kor_ime;
            GostModel.findOneAndDelete({'kor_ime': kor_ime}).then(ok=>{
                res.json({message: "ok"})
            }).catch(err=>{
                console.log(err)
            })
    }

    dodajOdbijenog=(req:express.Request,res:express.Response)=>{
        let odbijen=new OdbijeniModel({
            kor_ime:req.body.kor_ime,
            mejl:req.body.mejl
        })
        odbijen.save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    obrisiGosta=(req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let odobren="deaktiviran"
        GostModel.findOneAndUpdate({'kor_ime': kor_ime}, {$set: {'status': odobren}}).then(ok=>{
            
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    
}
