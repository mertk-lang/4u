const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true
    },
    }, {timestamps: true})

module.exports = mongoose.model('Post', Post);