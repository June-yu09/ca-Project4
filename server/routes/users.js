const express = require('express');
const User = require('../model/usersModel');
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


router.post('/', async (req,res)=>{
    console.log(req.body, 'this is requested data');
    const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city
    });

    newUser
    .save()
    .then(result=>{
        res.send(result);
    })
    .catch(err=>{
        res.status(500).send('failed to create a user')
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
