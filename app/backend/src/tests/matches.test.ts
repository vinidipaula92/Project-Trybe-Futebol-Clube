import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as Sinon from 'sinon';
import { app } from '../app';
import Matches from '../database/models/matches.model';
import { INewMatch } from '../interface/IMatches';
import { tokenMock, validToken } from './user.test';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
    {
      id: 1,
      homeTeam: 13,
      homeTeamGoals: 0,
      awayTeam: 19,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: "Fluminense"
      },
      teamAway: {
        teamName: "Santos"
      }
    },
    {
      id: 380,
      homeTeam: 11,
      homeTeamGoals: 0,
      awayTeam: 10,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "Cuiabá"
      },
      teamAway: {
        teamName: "Flamengo"
      }
    }
  ];

  const matchesInProgressMock = [
    {
      id: 380,
      homeTeam: 11,
      homeTeamGoals: 0,
      awayTeam: 10,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "Cuiabá"
      },
      teamAway: {
        teamName: "Flamengo"
      }
    },
    {
      id: 379,
      homeTeam: 19,
      homeTeamGoals: 0,
      awayTeam: 14,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "Santos"
      },
      teamAway: {
        teamName: "Fortaleza"
      }
    }
  ];

  const saveMatchMock: INewMatch = {
    homeTeam: 16, 
    awayTeam: 8, 
    homeTeamGoals: 2,
    awayTeamGoals: 2
  }

  const saveMatchMockSucess = {
    id: 381,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  }

  const updateMock = {
    homeTeamGoals: 3,
    awayTeamGoals: 1
  }

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
    });
  });
  describe('Post', () => {
    beforeEach(() => {
      Sinon.restore();
    });
    it('Deve retornar um erro se o token for inválido', async() => {
      const response = await chai.request(app).post('/matches').send(saveMatchMock);

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token')
    });
    it('Deve ser criado uma nova partida com os respectivos times e placares', async() => {
      Sinon.stub(jwt, 'sign').returns(tokenMock as any).resolves(saveMatchMockSucess);

      const response = await chai.request(app).post('/matches')
      .send(saveMatchMock).set('authorization', validToken);

      expect(response.status).to.equal(201)
    })
  });
  describe('PATCH', () => {
    beforeEach(() => {
      Sinon.restore();
    });
    it('Deve retornar uma messagem "Finished" se a partida for finalizada', async() => {
      Sinon.stub(Matches, 'update').resolves()
      
      const response = await chai.request(app).patch('/matches/1/finish');

      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal('Finished')
    });
    it('Deve retornar o status 200 quando for atualizado a partida em andamento', async() => {
      Sinon.stub(Matches, 'update').resolves();

      const response = await chai.request(app).patch('/matches/1').send(updateMock);

      expect(response.status).to.be.equal(200)
    })
  });
});