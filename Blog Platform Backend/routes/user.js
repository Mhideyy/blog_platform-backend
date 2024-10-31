const express = require('express');
const routes = express.Router();
const verify = require('../middleware/verify');
const { updateInfo, updatePassword, deleteUser, updateRole } = require('../controllers/user');


routes.put('/user', verify, updateInfo);
routes.put('/password',verify, updatePassword);
routes.delete('/delete', verify, deleteUser);
routes.put('/role', verify, updateRole);

module.exports = routes;