const express = require('express');
const routes = express.Router();
const verify = require('../middleware/verify');
const { makePost, findPost, findOnePost, updatePost, deletePost, likePost } = require('../controllers/post');


routes.post('/post', verify, makePost);
routes.get('/post', findPost);
routes.get('/post/:id', findOnePost);
routes.put('/post', verify, updatePost);
routes.delete('/post', verify, deletePost);
routes.post('/like', verify, likePost);


module.exports = routes;