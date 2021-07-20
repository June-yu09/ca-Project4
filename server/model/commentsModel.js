const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    desc: {
        type: String,
        required: true,
    },
    productId: {
        type: String
    },
    uploader: { type: mongoose.Schema.Types.ObjectId , ref: 'User'}
}, { 
    timestamps: true,
    collection: 'comments'
    })

module.exports = mongoose.model('Comment', commentSchema );