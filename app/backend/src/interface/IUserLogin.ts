export interface IUserLogin {
  email: string;
  password: string;
}

export interface ILoginService {
  Login({ email, password }: IUserLogin): Promise<string>;
}
