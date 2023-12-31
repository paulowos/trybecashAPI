const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const connection = require('../../src/db/connection');

chai.use(chaiHttp);

const { expect } = chai;

const peopleList = [
  {
    id: 1,
    firstName: 'Luke',
    lastName: 'Skywalker',
    email: 'luke.skywalker.test.com',
    phone: '21123456789'
  },
  {
    id: 2,
    firstName: 'Dart',
    lastName: 'Vader',
    email: 'dart.vader.test.com',
    phone: '11123456789'
  }
];

describe('Testing people endpoints', function () {
  afterEach(sinon.restore);
  it('testing POST /people', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const response = await chai.request(app).post('/people').send({
      firstName: 'Luke',
      lastName: 'Skywalker',
      email: 'luke.skywalker@test.com',
      phone: '21999999999',
    });

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal({
      message: 'Pessoa cadastrada com sucesso com o id 42',
    });
  });

  it('testing GET /people', async () => {
    sinon.stub(connection, 'execute').resolves([peopleList]);

    const response = await chai.request(app).get('/people');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(peopleList);
  });

  it('testing GET /people/:id', async () => {
    sinon.stub(connection, 'execute').resolves([[peopleList[0]]]);

    const response = await chai.request(app).get('/people/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(peopleList[0]);
  });

  it('testing PUT /people/:id', async () => {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await chai
      .request(app)
      .put('/people/1')
      .send({
        firstName: 'Lucão',
        lastName: 'Andarilho dos céus',
        email: 'lucao.andarilho@test.com',
        phone: '21123456789'
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: 'Pessoa de id 1 atualizada com sucesso'
    });
  });

  it('testing DELETE /people/:id', async () => {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await chai
      .request(app)
      .delete('/people/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: 'Pessoa de id 1 excluída com sucesso'
    });
  });
});
