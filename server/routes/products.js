const express = require('express');
const Product = require('../model/productsModel');
const User = require('../model/usersModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Blacklist = require('../model/blacklistsModel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('../s3.js');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

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

router.get('/images/:key', (req,res)=>{
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
})

router.get('/all', (req,res)=>{
    Product
    .find({}, (err,products)=>{
        if(err){
            res.send(err);
        }else{
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

router.post('/delete', (req, res)=>{
    const { productId, userId } = req.body;
    Product
    .deleteOne({ _id: productId }, err=>{
        if(err){
            res.sendStatus(404);
        }
        User
        .findById(userId, (err, user)=>{
            if(err){
                res.sendStatus(400);
            }
            user.products.pull(productId);
            user.save();
            res.send('product is deleted');
        })

    })

})

router.post('/upload', upload.single('productImage') , async (req,res)=>{
    const { title, desc, price, uploader } = req.body;
    const file = req.file;
    const result = await uploadFile(file);
    const imagePath = await result.Key;
    await unlinkFile(file.path);
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
            image: imagePath
        })
        const newItem = await newProduct.save();
        user.products.push(newItem);
        
        user
        .save()
        .then(result=>{
            res.send(result);
        })
        .catch(err=>console.log(err))

    })
    
    
})




module.exports = router;