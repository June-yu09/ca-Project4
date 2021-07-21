const express = require('express');
const Product = require('../model/productsModel');
const User = require('../model/usersModel');
const Comment = require('../model/commentsModel');

const router = express.Router();

router.post('/create', (req,res)=>{
    const newComment = new Comment({
        desc: req.body.desc,
        uploader: req.body.uploader,
        productId: req.body.productId
    })
    newComment
    .save()
    .then(response=>{
        res.send(response);
    })
    .catch(err=>res.status(400).send(err))
})

router.post('/update', (req,res)=>{
    const { newDesc, commentId } = req.body;
    console.log('newDesc and id', newDesc, commentId);
    Comment
    .findById(commentId, (err,comment)=>{
        if(err){
            res.sendStatus(404);
        }
        comment.desc = newDesc;
        comment.save();
        res.send('modified successfully');
    })
})

router.get('/:id', (req,res)=>{
    const product = req.params.id;
    Comment
    .find({ productId: product })
    .populate('uploader')
    .exec((err, comments)=>{
        if(err){
            res.status(400).send(err);
        }
        res.send(comments);
    })
})

router.get('/delete/:id', (req,res)=>{
    const commentId = req.params.id;
    Comment
    .deleteOne({ _id: commentId })
    .then(()=>{
        res.send('successfully deleted');
    })
    .catch(err=>res.status(404).send(err))
})

module.exports = router;