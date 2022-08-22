import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
import Matches from '../database/models/matches.model';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    }
  ];

  const matchesInProgressMock = [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ];

  describe('Tela de partidas', () => {

  describe('List', () => {
    beforeEach(() => {
      Sinon.restore();
    });
    it('Deve retornar todas as partidas com os respectivos nomes dos times', async() => {
      Sinon.stub(Matches, 'findAll').resolves([matchesMock as unknown as Matches])

      const response = await chai.request(app).get('/matches');

      expect(response.status).to.equal(200);
    });
    it('Deve retornar todas as partidas em andamento com os respectivos nomes dos times', async() => {
      Sinon.stub(Matches, 'findAll').resolves([matchesInProgressMock as unknown as Matches])

      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.equal(200);
    })
  });
});