const express = require("express");
const router = express.Router();

//const {getAllposts, getPostById, createPost } = require('./controleer/postsController')
//const authenticate = require('../middleware'authenticate)

router.get("/", getAllposts);
router.get("/:id", getPostById);
router.post("/", authenticate, createPost);

module.exports = router;
