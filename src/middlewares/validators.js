const validate = require('../utils/validators');

const user = (req, _res, next) => validate.user(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const userExists = (req, _res, next) => validate.userExists(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 409, message }));

const login = (req, _res, next) => validate.login(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 401, message }));

const recipe = (req, _res, next) => validate.recipe(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const token = (req, _res, next) => validate.token(req.headers)
  .then((userData) => {
    req.user = userData;
    next();
  })
  .catch(({ message }) => next({ status: 401, message }));

module.exports = {
  user,
  userExists,
  login,
  recipe,
  token,
};