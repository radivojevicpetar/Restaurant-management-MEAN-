import  express  from 'express'
import DostavaModel from '../models/dostava'


export class DostavaController{

    dohvatiKorpu = (req: express.Request, res: express.Response)=>{
        let kor_ime=req.body.kor_ime;
        let status=req.body.status;
        DostavaModel.findOne({'gost': kor_ime,'status':status}).then((dostava)=>{
            res.json(dostava)
        }).catch((err)=>{
            console.log(err)
        })
    }
    novaKorpa = (req: express.Request, res: express.Response)=>{
        let iznosRacuna=0;
        let dostava=new DostavaModel({
            gost:req.body.gost,
            restoran:req.body.restoran,
            vremeDostave:req.body.vremeDostave,
            status:req.body.status,
            narudzbina:req.body.narudzbina,
            iznosRacuna:iznosRacuna
        })
        dostava.save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
    dodajKorpa = (req: express.Request, res: express.Response) => {
        let gost = req.body.gost;
        let vremeDostave = req.body.vremeDostave;
        let status = req.body.status;
        let jelo = req.body.jelo

        DostavaModel.updateOne({ 'gost': gost, 'status':status},{ 
            $push: { 'narudzbina': jelo },
            $set: { 'vremeDostave': vremeDostave }
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }

    obrisiKorpa = (req: express.Request, res: express.Response) => {
        let gost = req.body.gost;
        let vremeDostave = req.body.vremeDostave;
        let status = req.body.status;
        let id = req.body.id;
    
        DostavaModel.updateOne(
            { 'gost': gost, 'status': status },
            {
                $set: { 'vremeDostave': vremeDostave },
                $pull: { 'narudzbina': { "id": id } }
            }
        ).then(result => {
            DostavaModel.findOne({ 'gost': gost, 'status': status }).then(dostava => {
                if (!dostava || dostava.narudzbina.length === 0) {
                    DostavaModel.deleteOne({ 'gost': gost, 'status': status }).then(() => {
                        res.json({ message: 'ok' });
                    }).catch(err => {
                        res.status(500).json({ message: err });
                    });
                } else {
                    res.json({ message: 'ok' });
                }
            }).catch(err => {
                res.status(500).json({ message: err });
            });
        }).catch(err => {
            res.status(500).json({ message: err });
        });
    }
    posaljiDostavu = (req: express.Request, res: express.Response) => {
        let gost = req.body.gost;
        let vremeDostave = req.body.vremeDostave;
        let status = req.body.status;
        let st="neposlata"
        let iznosRacuna=req.body.iznosRacuna

        DostavaModel.updateOne({ 'gost': gost, 'status':st},{ 
            $set: { 'vremeDostave': vremeDostave, 'status':status,'iznosRacuna':iznosRacuna}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }
    dohvatiSveDostave = (req: express.Request, res: express.Response)=>{
        let restoran=req.body.restoran;
        let status="poslata"
        DostavaModel.find({'restoran':restoran,'status':status}).then((dostava)=>{
            res.json(dostava)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dohvatiAktuelneDostave = (req: express.Request, res: express.Response)=>{
        let gost=req.body.gost;
        let status="prihvacena"
        DostavaModel.find({'gost':gost,'status':status}).then((dostava)=>{
            res.json(dostava)
        }).catch((err)=>{
            console.log(err)
        })
    }
    dohvatiMojeDostave = (req: express.Request, res: express.Response)=>{
        let gost=req.body.gost;
        DostavaModel.find({'gost':gost}).then((dostava)=>{
            res.json(dostava)
        }).catch((err)=>{
            console.log(err)
        })
    }
    odbijDostavu = (req: express.Request, res: express.Response) => {
        let dostavaGost = req.body.dostava.gost;
        let dostavaRestoran = req.body.dostava.restoran;
        let st="poslata"
        let status="odbijena"

        DostavaModel.updateOne({ 'gost': dostavaGost,'restoran':dostavaRestoran, 'status':st},{ 
            $set: {'status':status}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }
    prihvatiDostavu = (req: express.Request, res: express.Response) => {
        let dostavaGost = req.body.dostava.gost;
        let dostavaRestoran = req.body.dostava.restoran;
        let vremeDostave=req.body.vremeDostave
        let st="poslata"
        let status="prihvacena"

        DostavaModel.updateOne({ 'gost': dostavaGost,'restoran':dostavaRestoran, 'status':st},{ 
            $set: {'status':status,'vremeDostave':vremeDostave}
          }
        ).then(ok=>{
            res.json({ message: 'ok' })
        }).catch(err=>{
            res.json({ message: err })
        })
    }

}