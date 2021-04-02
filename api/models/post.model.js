const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: String,
})

module.exports = mongoose.model('Post', Post);