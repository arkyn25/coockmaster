const userModel = require('../models/userModel');
const createT = require('../utils/tokenGenerator');

const create = (newUser, role) => userModel.createUser(newUser, role)
  .then(({ password, ...user }) => ({ status: 201, user }));

const login = ({ email }) => createT.createToken(email)
  .then(({ token }) => ({ status: 200, token }));

module.exports = {
  create,
  login,
};