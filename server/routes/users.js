const express = require('express');
const User = require('../model/usersModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const key = require('../keys').secretKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();



router.get('/all', (req,res)=>{
    User.find({}, (err,users)=>{
        if(err){
            res.send(err);
        }else{
            res.send(users);
        }
    })
} )

router.get('/profile', passport.authenticate('jwt', { session: false }), (req,res)=>{
    User
    .findById(req.user.id, (err, user)=>{
        if (err){
            res.status(404).json({ error: 'User does not exist' })
        } else {
            console.log(user.email);
            res.send(user);
        }
    })
})


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


router.get('/detail/:id', (req,res)=>{
    const userId = req.params.id;
    User
    .findById(userId)
    .populate('products')
    .exec((err,user)=>{
        if(err){
            res.send(err);
        }else{
            console.log(user.products);
            res.send(user);
        }
    })
})


module.exports = router;
