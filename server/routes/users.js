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


module.exports = router;