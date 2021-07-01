const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema );