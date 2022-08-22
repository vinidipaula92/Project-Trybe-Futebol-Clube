import * as bcrypt from 'bcryptjs';

class PasswordService {
  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static comparePassword(password: string, hash: string) {
    const isValid = bcrypt.compareSync(password, hash);
    return isValid;
  }
}

export default PasswordService;
