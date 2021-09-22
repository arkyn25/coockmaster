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

route.get(
  '/',
  recipe.recipesList,
);

route.get(
  '/:id',
  validate.recipeId,
  recipe.getById,
);

module.exports = route;