const connection = require('./connection');

const createRecipe = (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne(recipe)
  .then(({ ops }) => ops[0]));

module.exports = {
  createRecipe,
};