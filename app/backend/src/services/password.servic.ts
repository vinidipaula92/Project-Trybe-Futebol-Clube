import * as bcrypt from 'bcryptjs';

const PasswordService = {
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const encrypted = bcrypt.hashSync(password, salt);
    return encrypted;
  },
  comparePassword(password: string, hash: string): boolean {
    const verify = bcrypt.compareSync(password, hash);
    return verify;
  },
};

export default PasswordService;
