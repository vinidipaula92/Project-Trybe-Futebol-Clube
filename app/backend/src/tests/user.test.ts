import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as Sinon from 'sinon';
import { app } from '../app';
import User from '../database/models/user.model';
import PasswordService from '../services/passwordService';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;


const loginMock = {
  email: "admin@admin.com",
  password: "secret_admin",
}

const incorrectLoginMock = {
  email: "vini@vini.com.br",
  password: "secret_user",
}

const tokenMock = "any-token";

const userMock = {
  id: 1,
  username: 'any-name',
  role: 'any-role',
  email: 'any-email',
  password: 'any-password'
}

describe('Tela de Login', () => {
    beforeEach(() => {
      Sinon.restore();
    });
    it('Deve retornar um token', async () => {
      
      Sinon.stub(jwt, 'sign').returns(tokenMock as any);
      Sinon.stub(User, 'findOne').resolves(loginMock as User);
      Sinon.stub(PasswordService, 'comparePassword').returns(true);

      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);

      expect(response.status).to.be.equal(200);
      expect(response.body.token).to.be.equal(tokenMock);
    });

    it('Deve retornar um erro ao tentar logar com senha incorreta', async () => {
      Sinon.stub(User, 'findOne').resolves(incorrectLoginMock as User);
      Sinon.stub(PasswordService, 'comparePassword').returns(false);
      Sinon.stub(jwt, 'sign').returns(tokenMock as any);

      const response = await chai.request(app)
        .post('/login')
        .send(incorrectLoginMock);

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('Senha inválida');
    });

    it('Deve retornar um erro ao tentar logar com dados nulos', async () => {
      Sinon.stub(User, 'findOne').resolves(null);
      Sinon.stub(PasswordService, 'comparePassword').returns(false);
      Sinon.stub(jwt, 'sign').returns(tokenMock as any);

      const response = await chai.request(app)
        .post('/login')
        .send(userMock);

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });

    it('Deve retornar um erro ao tentar logar com dados inválidos', async () => {
      Sinon.stub(User, 'findOne').resolves(userMock as User);
      Sinon.stub(PasswordService, 'comparePassword').returns(false);
      Sinon.stub(jwt, 'sign').returns(tokenMock as any);

      const response = await chai.request(app)
        .post('/login')
        .send(userMock);

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });