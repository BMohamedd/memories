const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    title: {type: String, required: true},
    message: {type: String, required: true},
    creator: {type: String, require:true},
    tags: [{type: String}],
    selectedFile: String,
    likeCounter: {type: Number, default:0},
    picture: {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Posts", postsSchema)