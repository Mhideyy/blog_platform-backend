const express = require('express');
const routes = express.Router();
const { loginUser, createUser, logoutUser, oauthRegister,  } = require('../controllers/auth');
const verify = require('../middleware/verify');

routes.post('/user', createUser);
routes.post('/oauth-User', oauthRegister);
routes.post('/logout', verify, logoutUser);
routes.post('/login', loginUser);

module.exports = routes;