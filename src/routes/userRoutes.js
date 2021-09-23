const express = require('express');

const validate = require('../middlewares/validators');

const user = require('../controllers/userController');

const route = express.Router();

route.post(
  '/',
  validate.user,
  validate.userExists,
  user.createUser,
);

route.post(
  '/admin',
  validate.token,
  validate.admin,
  user.createAdmin,
);

module.exports = route; 