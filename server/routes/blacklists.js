const express = require('express');
const Blacklist = require('../model/blacklistsModel');
const bcrypt = require('bcrypt');
const key = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

router.post('/find', (req,res)=>{
    console.log(req.body.token);
    Blacklist
    .findOne({ token: req.body.token })
    .then(result=>{
        console.log(result);
        if( result === null ){
            res.send("good access");
        }else{
            res.send("Your token exists in our blacklist...bad access");
        }
    })
    .catch(err=>{
        res.status(404).send(err);
    })
    //when findOne couldn't find doc, it returns null, not an error

})

router.post('/add', (req,res)=>{
    const newList = new Blacklist({
        token: req.body.token
    })

    newList
    .save()
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(402).send(err);
    })

})

module.exports = router;