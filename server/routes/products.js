const express = require('express');
const Product = require('../model/productsModel');
const User = require('../model/usersModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();



router.get('/all', (req,res)=>{
    Product
    .find({}, (err,products)=>{
        if(err){
            res.send(err);
        }else{
            console.log("products are ...",products);
            res.send(products);
        }
    })
} )
router.get('/usersall', passport.authenticate('jwt', { session: false }), (req, res) => {
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
    .findById(productId, (err, product)=>{
        if(err){
            res.send(err);
        }else{
            res.send(product);
            console.log(product);
        }
    })
} )

router.post('/upload',async (req,res)=>{
    const { title, desc, price, uploader } = req.body;
    let theUser =await User.findById(uploader);
    const newProduct = new Product({
        title: title,
        desc: desc,
        price: price,
        uploader: theUser._id,
    })
    const newItem = await newProduct.save();
    await theUser.products.push(newItem);
    
    theUser
    .save()
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>console.log(err))
    
})

module.exports = router;