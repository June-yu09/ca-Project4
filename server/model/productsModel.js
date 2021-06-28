const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    uploader: { type: mongoose.Schema.Types.ObjectId , ref: 'User'}
})
module.exports = mongoose.model('Product', productSchema );