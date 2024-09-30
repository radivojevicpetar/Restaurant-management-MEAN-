import  express  from 'express'
import KonobarModel from '../models/konobar'

const bcrypt = require('bcrypt');
const saltRounds = 10;

export class KonobarController{
    login = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        KonobarModel.findOne({ 'kor_ime': kor_ime }).then((konobar) => {
            if (!konobar) {
                return res.status(404).json({ error: "User not found" });
            }
    
            bcrypt.compare(lozinka, konobar.lozinka, (err:any, result:any) => {
                if (err) {
                    return res.status(500).json({ error: "Error comparing passwords" });
                }
    
                if (result) {
                    // Passwords match
                    res.json(konobar);
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

    registracija = (req: express.Request, res: express.Response)=>{

        bcrypt.hash(req.body.lozinka, saltRounds, (err:any, hash:any) => {
            if (err) {
                return res.status(500).json({ error: "Error encrypting password" });
            }
        let konobar = new KonobarModel({
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
            restoran:req.body.restoran
        })
        konobar.save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    })
    }
    dohvatiKonobara = (req: express.Request, res: express.Response)=>{
        let kor_ime=req.body.kor_ime;
        KonobarModel.findOne({'kor_ime': kor_ime}).then((konobar)=>{
            res.json(konobar)
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
        KonobarModel.findOneAndUpdate({'kor_ime': kor_ime}, {$set: {'lozinka': hash}}).then(ok=>{
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
        let restoran=req.body.restoran
        KonobarModel.updateOne({'kor_ime': kor_ime}, {$set: {'ime': ime,'prezime': prezime,'pol':pol,'mejl':mejl,'telefon':telefon,'adresa':adresa,'img': img,'restoran':restoran}}).then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    obrisiKonobara=(req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let odobren="deaktiviran"
        KonobarModel.findOneAndUpdate({'kor_ime': kor_ime}, {$set: {'status': odobren}}).then(ok=>{
            
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    dohvatiSveKonobare = (req: express.Request, res: express.Response)=>{
        KonobarModel.find({}).then((konobar)=>{
            res.json(konobar)
        }).catch((err)=>{
            console.log(err)
        })
    }
    }