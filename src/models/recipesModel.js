const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne(recipe)
  .then(({ ops }) => ops[0]));

const recipesList = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = {
  createRecipe,
  recipesList,
  getById,
};