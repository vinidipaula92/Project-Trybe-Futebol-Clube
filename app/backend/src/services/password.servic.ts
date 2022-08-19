import * as bcrypt from 'bcryptjs';

export default class PasswordService {
  static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(5);
    const encrypted = bcrypt.hashSync(password, salt);
    return encrypted;
  }

  static comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
