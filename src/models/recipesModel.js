const connection = require('./connection');

const createRecipe = (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne(recipe)
  .then(({ ops }) => ops[0]));

const recipesList = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  createRecipe,
  recipesList,
};