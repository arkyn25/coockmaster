const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne(recipe)
  .then(({ ops }) => ops[0]));

const recipesList = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = (id, recipe) => connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: recipe }));

const excluseRecipe = (id) => connection()
  .then((db) => db.collection('recipes')
  .deleteOne({ _id: ObjectId(id) }));

const imageRecipe = (id, image) => connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { image } }));

module.exports = {
  createRecipe,
  recipesList,
  getById,
  updateRecipe,
  excluseRecipe,
  imageRecipe,
};