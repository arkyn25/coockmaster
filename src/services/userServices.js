const userModel = require('../models/userModel');

const create = (newUser, role) => userModel.createUser(newUser, role)
  .then(({ password, ...user }) => ({ status: 201, user }));

module.exports = {
  create,
};