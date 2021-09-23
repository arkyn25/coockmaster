const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app');
const connection = require('./connectionMock');
const { MongoClient } = require('mongodb');
const { after } = require('mocha');

const { expect } = chai;

describe('POST /users', () => {
  describe('informações invalidas do usuario', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/users').send({});
    });

    it('retorna status 400', () => {
    expect(response).to.have.status(400)
    });

    it('deve ser um objeto', () => { 
    expect(response.body).to.be.an('object')
    });

    it('deve retornar a message', () => { 
      expect(response.body).to.have.a.property('message')
    });
    
    it('deve retornar message de error', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('se user for cadastrado com sucesso', () => {
    const fakeUser = { name: 'joaquin', email: 'joaquin@email.com', password: '12345678' };
    let connetion;
    let response;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      response = await chai.request(app).post('/users').send(fakeUser);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteOne({ username: 'joaquin' });
    });

    it('deve retornar status 201', () =>
      expect(response).to.have.status(201));

    it('deve ser um objeto', () =>
      expect(response.body).to.be.an('object'));

    it('deve ter a propriedade user', () =>
      expect(response.body).to.have.property('user'));

    it('user deve ter propriedade name, email e role', () =>
      expect(response.body.user).to.include.all.keys('name', 'email', 'role'));
  });
});

describe('POST /login', () => {
  describe('quando login é invalido', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({});
    });

    it('deve retornar status 401', () => {
      expect(response).to.have.status(401)
    });

    it('deve ser um objeto', () => {
      expect(response.body).to.be.an('object')
    });

    it('deve retornar propriedade message', () => {
      expect(response.body).to.have.a.property('message')
    });

    it('deve retornar error message', () => {
      expect(response.body.message).to.be.equal('All fields must be filled')
    });
  });

  describe('usuario nao existe', () => {
    const janeDoe = { name: 'janeDoe', email: 'janeDoe@email.com', password: 'unexists' };
    let connetion;
    let response;

    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      response = await chai.request(app).post('/login').send(janeDoe);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('deve retornar status 401', () => {
      expect(response).to.have.status(401)
    });

    it('deve ser um objeto', () => {
      expect(response.body).to.be.an('object')
    });

    it('deve retornar propriedade message', () => {
      expect(response.body).to.have.property('message')
    });

    it('deve retornar error message', () => {
      expect(response.body.message).to.equal('Incorrect username or password')
    });
  });

  describe('quando login é feito com sucesso!', () => {
    const fakeUser = { name: 'joaquin', email: 'joaquin@email.com', password: '12345678' };
    let connetion;
    let response;
    
    before(async () => {
      connetion = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connetion);

      await connetion.db('Cookmaster').collection('users').insertOne(fakeUser);

      response = await chai.request(app).post('/login').send(fakeUser);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connetion.db('Cookmaster').collection('users').deleteOne({ username: 'fakeUser' });
    });

    it('deve retornar status 200', () => {
      expect(response).to.have.status(200);
    });

    it('deve retornar um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('deve ter a propriedade token', () => {
      expect(response.body).to.have.property('token');
    });

    it('token nao pode ser vazio', () => {
      expect(response.body.token).to.not.be.empty;
    });
  });
});