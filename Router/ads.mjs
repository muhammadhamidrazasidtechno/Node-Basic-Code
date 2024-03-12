import adsSchema from "../models/adsSchema.mjs";

import express from "express"

const router = express.Router();


router.post('/add', (req, res) => {
    console.log(req.body
        );
    const user = new adsSchema(req.body);

    user.save().then(newUser => {
        res.send(newUser)
        res.send({message: 'User added successfully'})
    }).catch(err => {
        res.status(500).send(err)
    });
})
router.get("/", async (req, res) => {
    try {
      const ads = await adsSchema.find(); // Retrieve all ads from the database
      res.json(ads);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.get('/title/:tit',async (req,res) =>{
    try{
    const ad = await adsSchema.find({title : req.params.tit})
    console.log(req.params);
    res.json(ad);
    }catch(err){
      res.status(500).json({ message: err.message });

    }

})


router.get('/color/:col',async (req,res) =>{
    try{
    const ad = await adsSchema.find({color : req.params.col})
    console.log(req.params);
    res.json(ad);
    }catch(err){
      res.status(500).json({ message: err.message });

    }

})


router.get('/amount/:amont',async (req,res) =>{
    try{
    const ad = await adsSchema.find({amount : req.params.amont})
    console.log(req.params);
    res.json(ad);
    }catch(err){
      res.status(500).json({ message: err.message });

    }

})


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;

    adsSchema.findByIdAndUpdate(id, update)
    .then(updatedAd => {
        res.json(updatedAd);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    adsSchema.findByIdAndDelete(id)
    .then(deletedAd => {
        if (deletedAd) {
            res.json({ message: 'Ad deleted successfully' });
        } else {
            res.status(404).json({ message: 'Ad not found' });
        }
    })
    .catch(err => {
        res.status(500).send(err);
    });
});


export default router