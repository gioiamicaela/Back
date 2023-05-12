const express = require('express');
const privateRouter = express.Router();

const { handlePassword } = require('../controllers/privateController');

privateRouter.patch('/password', handlePassword);

module.exports = privateRouter;
