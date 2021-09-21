const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = '2465hyf0874uj0238jslj293';
const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createToken = async (email) => {
  const { password, ...user } = await userModel.getUserByEmail(email);
  const token = jwt.sign(user, secret, jwtConfig);
  return { token };
};

module.exports = {
  createToken,
};