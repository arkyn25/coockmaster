const userServices = require('../services/userServices');

const createUser = (req, res) => userServices.create(req.body)
  .then(({ status, user }) => res.status(status).json({ user }));

module.exports = {
  createUser,
};