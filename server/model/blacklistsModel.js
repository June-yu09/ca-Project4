const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blacklistSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    collection: 'blacklists'
})

module.exports = mongoose.model('Blacklist', blacklistSchema);