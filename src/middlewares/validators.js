const validate = require('../utils/validators');

const user = (req, _res, next) => validate.user(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const admin = (req, _res, next) => validate.admin(req.headers)
  .then(() => next())
  .catch(({ message }) => next({ status: 403, message }));

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

const recipeId = (req, _res, next) => validate.recipeId(req.params.id)
  .then(() => next())
  .catch(({ message }) => next({ status: 404, message }));

module.exports = {
  user,
  admin,
  userExists,
  login,
  recipe,
  token,
  recipeId,
};