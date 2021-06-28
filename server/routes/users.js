const express = require('express');
const usersModel = require('../model/usersModel');
const router = express.Router();

router.get('/test', (req, res)=>{
    res.send({ msg : 'test route' });
})

router.get('/all', (req,res)=>{
    usersModel.find({}, (err,users)=>{
        if(err){
            res.send(err);
        }else{
            res.send(users);
        }
    })
} )

router.get('/:id', (req,res)=>{
    const userId = req.params.id;
    usersModel
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

