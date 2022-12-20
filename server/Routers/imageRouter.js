const express=require('express')
const router=express.Router();
const imagemodel=require('../models/imageModel')
router.post('/',async (req,res)=>{
    const body=req.body;
    try{
        const article= await new imagemodel(body);
     article.save()
     res.send('images added')

    }
    catch(err)
    {
        res.send('err');
    }
    
})
module.exports=router