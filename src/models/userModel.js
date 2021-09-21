const connection = require('./connection');

const createUser = (user, role = 'user') => connection()
  .then((db) => db.collection('users').insertOne({ ...user, role })
  .then(({ ops }) => ops[0]));

const getUserByEmail = (email) => connection().then((db) =>
  db.collection('users').findOne({ email }));

module.exports = {
  createUser,
  getUserByEmail,
};