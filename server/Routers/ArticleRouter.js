const express=require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const articlemodel=require('../models/ArticleModel')
router.post('/',async (req,res)=>{
    const body=req.body;
    try{
        const article= await new articlemodel(body);
     article.save()
     res.send('article added')

    }
    catch(err)
    {
        res.send('err');
    }
    
})
router.get('/',async(req,res)=>{
    try{
        const article=await articlemodel.find().sort('-Date').populate('created_by','userName imageUrl _id about rating').exec();
        res.send(article);
    }
    catch(err)
    {
        res.send(err);
    }
})
router.get('/:pinId',async(req,res)=>{
    const category=req.params.pinId
    try{
        const article=await articlemodel.find({'category':category}).sort('-Date').exec();
        res.send(article)
    }
    catch(err)
    {
        res.send(err)
    }
})
router.get('/savepin/:item',async(req,res)=>{
    const id=req.params.item;
    userId = mongoose.Types.ObjectId(id)
    try{
        const pin=await articlemodel.findById(userId).populate('created_by','userName imageUrl about rating').exec();
    res.send(pin);

    }
    catch(err)
    {
        res.send({})
    }
    
})

router.put('/update/vote/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    await articlemodel.updateOne({ "_id":id},{ "$push": { "upvote": likeid } }, { "new": true, "upsert": true }).exec()
})
router.put('/update/like/:id/:likeid',async(req,res)=>{
    const id=req.params.id;
    const likeid=req.params.likeid
    await articlemodel.updateOne({ "_id":id},{ "$push": { "likes": likeid } }, { "new": true, "upsert": true }).exec()
})
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await articlemodel.findByIdAndDelete({ _id: id }).exec();
    }
    catch(err)
    {
        res.send(err);
    }
})
module.exports=router