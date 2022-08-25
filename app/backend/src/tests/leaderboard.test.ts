import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
// import Teams from '../database/models/teams.model';
import classificationAway from '../mocks/away.mock';
import classification from '../mocks/classification.mock';
import classificationHome from '../mocks/home.mock';
// @ts-ignore
import chaiHttp = require('chai-http');
// import { ILeaderboardMask } from '../interface/ILeaderboard';
// import { ITeamsName } from '../interface/ITeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  describe('GET /leaderboard', () => {
    afterEach(() => {
      Sinon.restore();
    });

    it('Deve retornar a tabela completa de classificação', async () => {
      const response = await chai.request(app).get('/leaderboard');
      
      expect(response).to.have.status(200);
      expect(response.body).to.be.eql(classification);
    });
  });
  describe('GET /leaderboard/home', () => {
    afterEach(() => {
      Sinon.restore();
    });

    it('Deve retornar a tabela completa de classificação', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      
      expect(response).to.have.status(200);
      expect(response.body).to.be.eql(classificationHome);
    });
  });
  describe('GET /leaderboard/away', () => {
    afterEach(() => {
      Sinon.restore();
    });

    it('Deve retornar a tabela completa de classificação', async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      
      expect(response).to.have.status(200);
      expect(response.body).to.be.eql(classificationAway);
    });
  });
});