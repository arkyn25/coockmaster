const recipesService = require('../services/recipeServices');

const createRecipe = (req, res) => recipesService.createRecipe(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

module.exports = {
  createRecipe,
};