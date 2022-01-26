const express = require('express');
const router = express.Router();
const mdc = require('../controllers/controllers');
const post = require('../config/postsModule');


// get all posts
router.get('/', mdc.mainRoute);
// saves a post to the database using the paramiters given
router.post("/create", mdc.createPost);
// update existing postes 
router.patch("/:id", mdc.updatePost);
// deleting postes
router.delete("/delete/:id", mdc.deletePost);
// update like value
router.patch("/like/:id", mdc.addLike)


module.exports = router;