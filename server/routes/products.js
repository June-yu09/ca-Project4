const express = require('express');
const Product = require('../model/productsModel');
const router = express.Router();


router.get('/all', (req,res)=>{
    Product
    .find({}, (err,products)=>{
        if(err){
            res.send(err);
        }else{
            res.send(products);
        }
    })
} )

router.get('/detail/:id', (req,res)=>{
    const productId = req.params.id;
    Product
    .findById(productId, (err, product)=>{
        if(err){
            res.send(err);
        }else{
            res.send(product);
            console.log(product);
        }
    })
} )

router.post('/', (req,res)=>{
    const { title, desc, price, uploader } = req.body;
    const newProduct = new Product({
        title: title,
        desc: desc,
        price: price,
        uploader: uploader
    })
    newProduct
    .save()
    .then(result=>{
        res.send(result);
    })
    .catch(err=>{
        res.send(err);
    })
})

module.exports = router;