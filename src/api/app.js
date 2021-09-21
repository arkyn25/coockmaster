const express = require('express');
const bodyParser = require('body-parser');
const user = require('../routes/userRoutes');
const login = require('../routes/loginRoutes');
const recipes = require('../routes/recipesRoutes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', user);
app.use('/login', login);
app.use('/recipes', recipes);

app.use((err, _req, res, _next) => {
  if (!err.status) return console.log(err);
  res.status(err.status).json({ message: err.message });
});

module.exports = app;
