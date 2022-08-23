import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as Sinon from 'sinon';
import { app } from '../app';
import User from '../database/models/user.model';
import JwtService from '../services/JwtService';
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

export const tokenMock = "any-token";
export const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjYxMjI0OTI3fQ.5MpWKGWYQ2raaSatSi97aCYOTZSSej2Few8hkfJDfd8'

const userMock = {
  id: 3,
  username: 'any-name',
  role: 'admin',
  email: 'any-email',
  password: 'any-password'
}

describe('Tela de Login', () => {
  describe('POST', () => {
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

  });
  describe('GET', () => {
    beforeEach(() => {
      Sinon.restore();
    });
    it('Ao passar token inválido, deve retornar uma messagem de erro com status 401',async () => {
      const response = await chai.request(app)
      .get('/login/validate')
      .set('Authorization', tokenMock);
  
      const { message } = response.body;
      expect(response.status).to.be.equal(401)
      expect(message).to.equal('Token must be a valid token')
    });
    it('Deve retornar a role do usuário com o status 200, ao realizar uma requisição com token correto', async() => {
      Sinon.stub(JwtService, 'sign').returns(tokenMock as any).resolves(userMock.role);

      const response = await chai.request(app).get('/login/validate')
      .set('authorization', validToken);
      
      const { role } = response.body;
      expect(response.status).to.equal(200);
      expect(role).to.equal('user')
    });
  });
});