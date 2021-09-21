const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const connection = () => DBServer.getUri()
  .then((url) => MongoClient.connect(url, OPTIONS));

module.exports = connection;