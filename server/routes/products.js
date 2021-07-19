const express = require('express');
const Product = require('../model/productsModel');
const User = require('../model/usersModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Blacklist = require('../model/blacklistsModel');

const router = express.Router();

const middleware1 = (req,res,next)=>{
    console.log('after I put token in the body?', req.body);
    Blacklist
    .findOne({ token: req.body.myToken })
    .then(result=>{
        console.log(result);
        if( result === null ){
            console.log('good access');
            // res.send("good access");
        }else{
            console.log('Your token exists in our blacklist');
            // res.send("Your token exists in our blacklist...bad access");
        }
    })
    .catch(err=>{
        res.status(404).send(err);
    })
    next();
}

router.get('/all', (req,res)=>{
    Product
    .find({}, (err,products)=>{
        if(err){
            res.send(err);
        }else{
            // console.log("products are ...",products);
            res.send(products);
        }
    })
})

router.post('/productdetail', (req,res)=>{
    Product
    .findById(req.body.productnumber, (err,product)=>{
        if (err) {
            res.send(err);
        } else {
            console.log("detail of the product");
            res.send(product);
        }
    })
})

router.post('/usersall', [passport.authenticate('jwt', { session: false }), middleware1], (req, res) => {
    User
    .findById(req.user.id)
    .populate('products')
    .exec((err, user)=>{
        if(err){
            res.status(404).send(err);
        } else {
            console.log(user.products);
            res.send(user.products);
        }

    })
})


router.get('/detail/:id', (req,res)=>{
    const productId = req.params.id;
    Product
    .findById(productId)
    .populate('uploader')
    .exec((err, product)=>{
        if(err){
            res.send(err);
        }else{
            res.send(product);
            console.log(product);
        }
    })
})

router.get('/delete/:id', (req, res)=>{
    const productId = req.params.id;
    Product
    .deleteOne({ _id: productId }, err=>{
        err?(res.status(404).send(err)):null;
    })

})

router.post('/upload', (req,res)=>{
    const { title, desc, price, uploader } = req.body;
    console.log('whatisuploader', uploader);
    console.log('title?', title);

    User
    .findById(uploader, async (err, user)=>{
        if(err){
            res.send(err);
        }

        const newProduct = new Product({
            title: title,
            desc: desc,
            price: price,
            uploader: uploader,
        })
        const newItem = await newProduct.save();
        user.products.push(newItem);
        
        user
        .save()
        .then(result=>{
            console.log(result);
            res.send(result);
        })
        .catch(err=>console.log(err))

    })
    
    
})




module.exports = router;