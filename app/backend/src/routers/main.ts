import MatchesController from '../controllers/matches.controller';
import TeamController from '../controllers/teams.controller';
import UserController from '../controllers/user.controller';
import MatchesService from '../services/matchesService';
import TeamsService from '../services/teamService';
import UserService from '../services/user.servic';

const userService = new UserService();
const userController = new UserController(userService);

const teamsService = new TeamsService();
const teamsController = new TeamController(teamsService);

const matchsService = new MatchesService();
const matchsController = new MatchesController(matchsService);

export { userController, teamsController, matchsController };
