const mongoose = require('mongoose');
const post = require('../config/postsModule');


module.exports.mainRoute = async (req, res) => {
try {
    // searching for posts
    const AllPosts = await post.find({});
    // if every thing is good return this:
    res.status(200).json(AllPosts);
} catch (error) {
    // if something happens return this:
    res.status(500).json({
        response: "something went wrong while looking for posts, please try again 😵",
         msg: error
    })
}
};
module.exports.createPost = (req, res) => {
    const postBody = req.body;

    const newpost = new post(postBody);
    
    newpost.save()
    .then((saved) => res.status(200).send(saved))
    .catch((err) => res.status(404).json({
        response: "something went wrong while saving your post, please try again 😵",
         msg: err
    }))

};
module.exports.updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const update = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id) || !req.body) return res.status(404).json({msg: "please try again 😕"})

    await post.findByIdAndUpdate(_id, update, {new: true})
    .then((post) => {
        res.status(200).json(post)
    })
    .catch((err) => {
        res.json({msg: "couldn't update the post 😕"})
    });
    
};
module.exports.addLike = async (req, res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({msg: "please try again 😕"})

    post.findById(_id)
    .then(postToUpdate => {
    post.findByIdAndUpdate(_id, {likeCounter: postToUpdate.likeCounter + 1}, {new: true})
    .then((post) => {
        res.status(200).json(post)
    })
    .catch(() => {
        res.json({msg: "couldn't like this post 😕, sorry."})
    });
    })
    
};
module.exports.deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "please try again 😕"})

    await post.findOneAndRemove(id)
    .then(() => {
        res.json('removal complete!')
    }).catch((err) => {
        res.send(err);
    });

} 
