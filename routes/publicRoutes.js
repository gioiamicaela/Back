const express = require('express');
const publicRouter = express.Router();

const { getToken, handleRegister } = require('../controllers/publicController');

publicRouter.post('/tokens', getToken);

publicRouter.post('/register', handleRegister);

module.exports = publicRouter;
