const express = require('express');

const user = require('../controllers/userController');

const validate = require('../middlewares/validators');

const route = express.Router();

route.post(
  '/',
  validate.login,
  user.login,
);

module.exports = route;