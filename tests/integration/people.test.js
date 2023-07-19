const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../src/app');
const connection = require('../../src/db/connection');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing people endpoint', function () {
  afterEach(sinon.restore);

  it('testing person registration', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const response = await chai.request(app).post('/people').send({
      firstName: 'Luke',
      lastName: 'Skywalker',
      email: 'luke.skywalker@test.com',
      phone: '9999-9999',
    });

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal({
      message: 'Pessoa cadastrada com sucesso com o id 42',
    });
  });
});
