import { StatusCodes } from 'http-status-codes';
import User from '../database/models/user.model';
import { ILoginService, IUserLogin } from '../interface/IUserLogin';
import UnauthorizedeError from '../validations/UnhathorizedError';
import ValidationError from '../validations/ValidationError';
import JwtService from './JwtService';
import PasswordService from './passwordService';
// import PasswordService from './password.servic';

export default class UserService implements ILoginService {
  private db = User;
  async Login({ email, password }: IUserLogin): Promise<string> {
    const user = await this.db.findOne({ where: { email } });
    if (!user) {
      throw new ValidationError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    const verifyPassword = PasswordService.comparePassword(password, user.password);
    if (!verifyPassword) {
      throw new ValidationError(StatusCodes.BAD_REQUEST, 'Senha inválida');
    }

    const token = JwtService.sign({ email, password });
    return token;
  }

  async getRole(token: string): Promise<User> {
    const { payload } = JwtService.verify(token);
    const user = await this.db.findOne({ where: { email: payload.email } });
    if (!user) {
      throw new UnauthorizedeError(StatusCodes.NOT_FOUND, 'Usuário não encontrado');
    }
    return user as User;
  }
}
