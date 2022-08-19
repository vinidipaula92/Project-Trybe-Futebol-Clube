// import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import { ILoginService } from '../interface/IUserLogin';
// import validateUser from '../validations/validateUser';

// export default class LoginController {
//   constructor(private loginService: ILoginService) { }

//   async Login(req: Request, res: Response) {
//     const validate = validateUser(req.body);
//     const token = await this.loginService.Login(validate);
//     res.status(StatusCodes.OK).json(token);
//   }
// }
