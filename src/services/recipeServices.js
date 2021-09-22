const recipesModel = require('../models/recipesModel');

const createRecipe = (newRecipe, { _id: userId }) =>
  recipesModel.createRecipe({ ...newRecipe, userId })
    .then((recipe) => ({ status: 201, recipe }));

const recipesList = () => recipesModel.recipesList()
  .then((data) => ({ status: 200, data }));

const getById = (id) => recipesModel.getById(id)
  .then((recipe) => ({ status: 200, recipe }));

module.exports = {
  createRecipe,
  recipesList,
  getById,
};