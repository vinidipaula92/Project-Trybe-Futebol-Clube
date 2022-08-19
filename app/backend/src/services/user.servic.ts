import { StatusCodes } from 'http-status-codes';
import User from '../database/models/user.model';
import { ILoginService, IUserLogin } from '../interface/IUserLogin';
import ValidationError from '../validations/ValidationError';
import JwtService from './JwtService';
import PasswordService from './password.servic';

export default class UserService implements ILoginService {
  private db = User;
  async Login({ email, password }: IUserLogin): Promise<string> {
    const user = await this.db.findOne({ where: { email } });
    if (!user) {
      throw new ValidationError(StatusCodes.BAD_REQUEST, 'Usuário não encontrado');
    }
    const verifyPassword = PasswordService.comparePassword(password, user.password);
    if (!verifyPassword) {
      throw new ValidationError(StatusCodes.BAD_REQUEST, 'Senha inválida');
    }
    const token = JwtService.sign({ email, password });
    return token;
  }
}
