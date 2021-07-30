const express = require('express');
const User = require('../model/usersModel');
const Product = require('../model/productsModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const key = process.env.secretKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();


router.post('/'
    ,body('email').isEmail()
    ,body('password').isLength({ min: 7 })  
    , async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // console.log(errors.array()[0].param);
            // if(errors.array()[0].param === 'email'){
            //     return res.status(400).send('Please put valid email')
            // } else if (errors.array()[0].param === 'password'){
            //     return res.status(400).send('Password should be min 7 chars');
            // }
            return res.status(400).json({ errors: errors.array() });
        }
        const pw = req.body.password;
        const hashed = await bcrypt.hash(pw, 10)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            city: req.body.city
        });

        newUser
        .save()
        .then(result=>{
            console.log(result);
            res.send(result);
        })
        .catch(err=>{
            res.status(500).send('failed to create a user')
        })
    }
)

router.post('/login', async (req,res)=>{
    
    const hashed = await bcrypt.hash(req.body.password, 10)

    User
    .findOne({
        email: req.body.email
    }, (err,user)=>{
        if(err){
            res.sendStatus(401);
        }else{
            bcrypt.compare(user.password, hashed, (err,result)=>{
                if(err){
                    res.sendStatus(401);
                }else{
                    jwt.sign({
                        sub: user.id,
                        email: user.email,
                        name: user.name
                    }, key, {expiresIn: '1h'}, (err,token)=>{
                        if(err){
                            res.json({success: false})
                        }else{
                            res.json({
                                success: true,
                                token: token
                            })
                        }
                        
                    })
                }
               
            })
            
        }
    })
})


router.get('/profile', passport.authenticate('jwt', { session: false }), (req,res)=>{
    User
    .findById(req.user.id)
    .populate('products')
    .populate('favorites')
    .exec((err, user)=>{
        if (err){
            res.status(404).json({ error: 'User does not exist' })
        } else {
            console.log('rendering...');
            res.send(user);
        }
    })
})

router.get('/detail/:id', (req,res)=>{
    const userId = req.params.id;
    User
    .findById(userId)
    .populate('products')
    .populate('favorites')
    .exec((err,user)=>{
        if(err){
            res.send(err);
        }else{
            res.send(user);
        }
    })
})

router.post('/addfavorite', (req,res)=>{
    const { productId, userId } = req.body;
    User
    .findById(userId, (err, user)=>{
        if(err){
            res.send(400).send(err);
        }
        Product
        .findById(productId, (err, product)=>{
            if(err){
                res.send(400).send(err);
            }
            user.favorites.push(product);
            user.save();
            res.send('favorite is added');
        })
    })
})

router.post('/deletefavorite', (req,res)=>{
    const { productId, userId } = req.body;
    User
    .findById(userId, (err, user)=>{
        if(err){
            res.send(400).send(err);
        }
        user.favorites.pull(productId);
        user.save();
        res.send('deleted from favorites');
    })
})

module.exports = router;
