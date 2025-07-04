const express = require("express");
const router = express.Router();
const { getCommentsForPost, addCommentToPost } = require('../controllers/commentsController');
const authenticate = require('../middleware/authenticate');

router.get('/', getCommentsForPost);
router.post('/', authenticate, addCommentToPost);
module.exports = router;