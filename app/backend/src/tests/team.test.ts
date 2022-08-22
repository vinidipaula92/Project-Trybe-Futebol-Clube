import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
import Teams from '../database/models/teams.model';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

const teamMock = {
  "id": 5,
  "teamName": "Cruzeiro"
}

describe('Tela de Times', () => {
  describe('List', () => {
    beforeEach(() => {
      Sinon.restore();
    });
    it('Deve retornar todos os times', async() => {
      Sinon.stub(Teams, 'findAll').resolves([teamsMock as unknown as Teams])

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.equal(200);
    });
    it('Deve retornar o time com o id passado no params', async() => {
      Sinon.stub(Teams, 'findAll').resolves([teamMock as unknown as Teams])

      const response = await chai.request(app).get('/teams/5');

      expect(response.status).to.equal(200);
    });
  });
});