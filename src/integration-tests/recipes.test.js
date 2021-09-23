const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../api/app');
const connection = require('./connectionMock');
const { MongoClient } = require('mongodb');
const { after } = require('mocha');

const { expect } = chai;

describe('POST /recipes', () => {
  describe('testa cadastro de receitas', () => {
    let response;
    let connetion;
    const fakeUser = { name: 'joaquin', email: 'joaquin@email.com', password: '12345678' };
    const newRecipe = {
      name: 'torta de frango',
      ingredients: 'trigo, leite, ovos, frango',
      preparation: 'bater no liquidificador por 3min, adicionar recheio'
    };

    before(async () => {
      connetion = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connetion);

      await connetion.db('Cookmaster').collection('users').insertOne(fakeUser);

      response = await chai.request(app).post('/users').send(fakeUser);

      const JWT_TOKEN = await chai.request(app).post('/login').send(fakeUser)
      .then(({ body }) => body.token);
      
      response = await chai.request(app).post('/recipes').set({ authorization: JWT_TOKEN }).send(newRecipe)
    });

    after(async () => {
      await connetion.db('Cookmaster').collection('users').deleteOne({ name: 'joaquin' });
      MongoClient.connect.restore();
    });

    it('deve retornar status 201', () => {
      expect(response).to.have.status(201);
    });

    it('deve retornar um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('deve ter a propriedade recipe', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('a propriedade "recipe" deve ser um objeto', () => {
      expect(response.body.recipe).to.be.an('object');
    });

    it('deve retornar as chaves esperadas', () => {
      expect(response.body.recipe).to.include.all.keys('name', 'ingredients', 'preparation', 'userId', '_id');
    });
  });

  describe('quando falha o cadastro', () => {
    describe('quando "name" não é inserido', () => {
      let response;
      let connetion;
      const fakeUser = { name: 'joaquin', email: 'joaquin@email.com', password: '12345678' };
      const newRecipe = {
        ingredients: 'trigo, leite, ovos, frango',
        preparation: 'bater no liquidificador por 3min, adicionar recheio'
      };
  
      before(async () => {
        connetion = await connection();
  
        sinon.stub(MongoClient, 'connect').resolves(connetion);
  
        await connetion.db('Cookmaster').collection('users').insertOne(fakeUser);
  
        response = await chai.request(app).post('/users').send(fakeUser);
  
        const JWT_TOKEN = await chai.request(app).post('/login').send(fakeUser)
        .then(({ body }) => body.token);
        
        response = await chai.request(app).post('/recipes').set({ authorization: JWT_TOKEN }).send(newRecipe)
      });
  
      after(async () => {
        await connetion.db('Cookmaster').collection('users').deleteOne({ name: 'joaquin' });
        MongoClient.connect.restore();
      });

      it('deve retornar status 400', () => {
        expect(response).to.have.status(400);
      });

      it('deve retornar um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto tem a propriedade "message"', () => {
        expect(response.body).to.have.a.property('message');
      });

      it('deve retornar error "message"', () => {
        expect(response.body.message).to.be.equals('Invalid entries. Try again.')
      });
    });

    describe('quando "ingredients" não é inserido', () => {
      let response;
      let connetion;
      const fakeUser = { name: 'joaquin', email: 'joaquin@email.com', password: '12345678' };
      const newRecipe = {
        name: 'torta',
        preparation: 'bater no liquidificador por 3min, adicionar recheio'
      };
  
      before(async () => {
        connetion = await connection();
  
        sinon.stub(MongoClient, 'connect').resolves(connetion);
  
        await connetion.db('Cookmaster').collection('users').insertOne(fakeUser);
  
        response = await chai.request(app).post('/users').send(fakeUser);
  
        const JWT_TOKEN = await chai.request(app).post('/login').send(fakeUser)
        .then(({ body }) => body.token);
        
        response = await chai.request(app).post('/recipes').set({ authorization: JWT_TOKEN }).send(newRecipe)
      });
  
      after(async () => {
        await connetion.db('Cookmaster').collection('users').deleteOne({ name: 'joaquin' });
        MongoClient.connect.restore();
      });

      it('deve retornar status 400', () => {
        expect(response).to.have.status(400);
      });

      it('deve retornar um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto tem a propriedade "message"', () => {
        expect(response.body).to.have.a.property('message');
      });

      it('deve retornar error "message"', () => {
        expect(response.body.message).to.be.equals('Invalid entries. Try again.')
      })
    });
    describe('quando "preparation" não é inserido', () => {
      let response;
      let connetion;
      const fakeUser = { name: 'joaquin', email: 'joaquin@email.com', password: '12345678' };
      const newRecipe = {
        name: 'torta',
        ingredients: 'trigo, leite, ovos, frango',
      };
  
      before(async () => {
        connetion = await connection();
  
        sinon.stub(MongoClient, 'connect').resolves(connetion);
  
        await connetion.db('Cookmaster').collection('users').insertOne(fakeUser);
  
        response = await chai.request(app).post('/users').send(fakeUser);
  
        const JWT_TOKEN = await chai.request(app).post('/login').send(fakeUser)
        .then(({ body }) => body.token);
        
        response = await chai.request(app).post('/recipes').set({ authorization: JWT_TOKEN }).send(newRecipe)
      });
  
      after(async () => {
        await connetion.db('Cookmaster').collection('users').deleteOne({ name: 'joaquin' });
        MongoClient.connect.restore();
      });

      it('deve retornar status 400', () => {
        expect(response).to.have.status(400);
      });

      it('deve retornar um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto tem a propriedade "message"', () => {
        expect(response.body).to.have.a.property('message');
      });

      it('deve retornar error "message"', () => {
        expect(response.body.message).to.be.equals('Invalid entries. Try again.')
      })
    });
  });

  describe('GET /recipes', () => {
    describe('quando retorna com sucesso', () => {
      let response;
      let connetion;
      const newRecipes = [
        { 
          name: 'name-test',
          ingredients: 'ingredients-test',
          preparation: 'preparation-test',
        },
        {
          name: 'name-test',
          ingredients: 'ingredients-test',
          preparation: 'preparation-test',
        }
      ];

      before(async () => {
        connetion = await connection();
  
        sinon.stub(MongoClient, 'connect').resolves(connetion);

        await connetion.db('Cookmaster').collection('recipes').deleteMany({});

        await connetion.db('Cookmaster').collection('recipes').
        insertMany(newRecipes)

        response = await chai.request(app).get('/recipes');
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('deve retornar status 200', () => {
        expect(response).to.have.status(200);
      });

      it('deve retornar um objeto', () => {
        expect(response.body).to.be.an('array');
      });

      it('espera que o array possua o tamanho de "2"', () => {
        expect(response.body.length).to.be.equal(2);
      });
    });

    describe('quando "token" não é valido', () => {
      describe('token invalido', () => {
        let response;
        let connetion;

        before(async () => {
          connetion = await connection();
          sinon.stub(MongoClient, 'connect').resolves(connetion);

          response = await chai.request(app).post('/recipes').send({}).set({ authorization: 'invalidToken' });
        });

        after(async () => {
          await connetion.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });

        it('deve retornar status 401', () => {
          expect(response).to.have.status(401);
        });

        it('deve retornar um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('deve retornar propriedade "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('deve retornar error "message" "jwt malformed', () => {
          expect(response.body.message).to.be.equal('jwt malformed');
        });
      });
    });

    describe('quando "token" não é informado', () => {
      describe('token não informado', () => {
        let response;
        let connetion;

        before(async () => {
          connetion = await connection();

          sinon.stub(MongoClient, 'connect').resolves(connetion);

          response = await chai.request(app).post('/recipes').send({});
        });

        after(async () => {
          MongoClient.connect.restore();
        });

        it('deve retornar status 401', () => {
          expect(response).to.have.status(401);
        });

        it('deve retornar um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('o objeto tem a propriedade "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('deve retornar error "message"', () => {
          expect(response.body.message).to.be.equal('missing auth token');
        });
      });
    })
  });
});