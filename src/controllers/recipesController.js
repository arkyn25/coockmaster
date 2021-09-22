const recipesService = require('../services/recipeServices');

const createRecipe = (req, res) => recipesService.createRecipe(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

const recipesList = (_req, res) => recipesService.recipesList()
  .then(({ status, data }) => res.status(status).json(data));

const getById = (req, res) => recipesService.getById(req.params.id)
  .then(({ status, recipe }) => res.status(status).json(recipe));

module.exports = {
  createRecipe,
  recipesList,
  getById,
};