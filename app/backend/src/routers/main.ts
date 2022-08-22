import TeamController from '../controllers/teams.controller';
import UserController from '../controllers/user.controller';
import TeamsService from '../services/teamService';
import UserService from '../services/user.servic';

const userService = new UserService();
const userController = new UserController(userService);

const teamsService = new TeamsService();
const teamsController = new TeamController(teamsService);

export { userController, teamsController };
