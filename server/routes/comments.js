const express = require('express');
const Product = require('../model/productsModel');
const User = require('../model/usersModel');
const Comment = require('../model/commentsModel');

const router = express.Router();

router.post('/create', (req,res)=>{
    const newComment = new Comment({
        desc: req.body.desc,
        uploader: req.body.uploader
    })
    newComment
    .save()
    .then(response=>{
        res.send(response);
    })
    .catch(err=>res.status(400).send(err))
})

router.get('/all', (req,res)=>{
    Comment
    .find({})
    .populate('uploader')
    .exec((err, comments)=>{
        if(err){
            res.status(400).send(err);
        }
        console.log('all the comments',comments);
        res.send(comments);
    })
})

module.exports = router;