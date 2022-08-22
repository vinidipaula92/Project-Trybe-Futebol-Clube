import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { IUserLogin } from '../interface/IUserLogin';
import ValidationError from '../validations/ValidationError';

export default class JwtService {
  static sign(payload: IUserLogin): string {
    const secret = jwt.sign({ payload }, process.env.JWT_SECRET as string);
    return secret;
  }

  static verify(token: string) {
    try {
      const secret = process.env.JWT_SECRET as string;
      const payload = jwt.verify(token, secret);
      return payload as jwt.JwtPayload;
    } catch (error) {
      throw new ValidationError(401, 'Invalid token');
    }
  }
}
