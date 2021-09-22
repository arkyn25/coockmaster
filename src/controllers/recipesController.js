const recipesService = require('../services/recipeServices');

const createRecipe = (req, res) => recipesService.createRecipe(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

const recipesList = (_req, res) => recipesService.recipesList()
  .then(({ status, data }) => res.status(status).json(data));

const getById = (req, res) => recipesService.getById(req.params.id)
  .then(({ status, recipe }) => res.status(status).json(recipe));

const updateRecipe = (req, res) => recipesService.updateRecipe(req.params.id, req.body, req.user)
  .then(({ status, userId }) => res.status(status)
  .json({ _id: req.params.id, ...req.body, userId }));

const excluseRecipe = (req, res) => recipesService.excluseRecipe(req.params.id)
  .then(({ status }) => res.status(status).json());

module.exports = {
  createRecipe,
  recipesList,
  getById,
  updateRecipe,
  excluseRecipe,
};