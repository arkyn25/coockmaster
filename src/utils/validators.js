const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const err = (message) => ({ message });

const user = async ({ name, email, password }) => {
  const mailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!name || !email || !password || !mailRegex) {
    throw err('Invalid entries. Try again.');
  }
};

const userExists = async ({ email }) => {
  const exists = await userModel.getUserByEmail(email);
  if (exists) throw err('Email already registered');
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw err('All fields must be filled');
  }

  const checkUser = await userModel.getUserByEmail(email);
  if (!checkUser || checkUser.password !== password) {
    throw err('Incorrect username or password');
  }
};

const recipe = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    throw err('Invalid entries. Try again.');
  }
};

const token = async ({ authorization }) => {
  const secret = '2465hyf0874uj0238jslj293';
  if (!authorization) {
    throw err('missing auth token');
  }
  const payload = jwt.verify(authorization, secret);
  if (!payload) {
    throw err('jwt malformed');
  }
  const { password, ...checkUser } = await userModel.getUserByEmail(payload.email);
  if (!checkUser) {
    throw err('Invalid entries. Try again.');
  }
  return checkUser;
};

module.exports = {
  user,
  userExists,
  login,
  recipe,
  token,
};