const express = require('express');
const productsModel = require('../model/productsModel');
const router = express.Router();


router.get('/all', (req,res)=>{
    productsModel.find({}, (err,products)=>{
        if(err){
            res.send(err);
        }else{
            res.send(products);
        }
    })
} )

router.get('/:id', (req,res)=>{
    const productId = req.params.id;
    productsModel.findById(productId, (err, product)=>{
        if(err){
            res.send(err);
        }else{
            res.send(product);
            console.log(product);
        }
    })
} )

module.exports = router;