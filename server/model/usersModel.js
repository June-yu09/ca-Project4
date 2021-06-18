const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    city: String,
})
module.exports = mongoose.model('User', userSchema );