import User from '../database/models/user.model';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface ILoginService {
  Login({ email, password }: IUserLogin): Promise<string>;
  getRole(token: string): Promise<User>;
}
