const express = require('express');
const { makeComment, getComment, editComment, deleteComment } = require('../controllers/comment');
const verify = require('../middleware/verify');
const routes = express.Router();

routes.post('/comment', verify, makeComment);
routes.get('/comment', verify, getComment);
routes.put('/comment', verify,  editComment);
routes.delete("/comment", verify, deleteComment)
module.exports = routes;