const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    isLoggedIn: {
        type: Boolean,
        default: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, {
    collection: 'users'
})
module.exports = mongoose.model('User', userSchema );