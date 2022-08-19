import UserController from '../controllers/user.controller';
import UserService from '../services/user.servic';

const userService = new UserService();
const userController = new UserController(userService);

export default userController;
