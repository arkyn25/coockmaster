const express = require('express');

const recipe = require('../controllers/recipesController');

const validate = require('../middlewares/validators');

const route = express.Router();

route.post(
  '/',
  validate.token,
  validate.recipe,
  recipe.createRecipe,
);

module.exports = route;