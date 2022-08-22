import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILoginService } from '../interface/IUserLogin';
import runSchema from '../validations/validateUser';

export default class UserController {
  constructor(private userService: ILoginService) {}

  async Login(req: Request, res: Response) {
    const validate = runSchema(req.body);
    const token = await this.userService.Login(validate);
    res.status(StatusCodes.OK).json({ token });
  }

  async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    const user = await this.userService.getRole(authorization as string);
    res.status(StatusCodes.OK).json(user.role);
  }
}
