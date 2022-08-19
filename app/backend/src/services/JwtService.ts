import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

export default class JwtService {
  static sign(payload: { email: string }): string {
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign(payload, secret, { expiresIn: '7d' });
  }
}
