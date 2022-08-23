import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as Sinon from 'sinon';
import { app } from '../app';
import User from '../database/models/user.model';
import PasswordService from '../services/passwordService';
import UnauthorizedeError from '../validations/UnhathorizedError';
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

export const tokenMock = "any-token";

const userMock = {
  id: 3,
  username: 'any-name',
  role: 'any-token',
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
      const response = await chai.request(app)
        .post('/login')
        .send(userMock);

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });

    it('Deve retornar um erro ao tentar logar com dados inválidos', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(userMock);

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });

    it('Ao passar token inválido, deve retornar uma messagem de erro com status 401',async () => {
      const response = await chai.request(app)
      .get('/login/validate')
      .set({authorization: tokenMock});

      const { message } = response.body;
      expect(response.status).to.be.equal(401)
      expect(message).to.equal('Token must be a valid token')
    });
    it('Deve retornar um UnauthorizedeError', async() => {
      Sinon.stub(User, 'findOne').callsFake(() => {
        throw new UnauthorizedeError(404, 'Usuário não encontrado');
      });
      const response = await chai.request(app).get('/users').send(loginMock);
      
      expect(response.status).to.equal(404)
    });
  });