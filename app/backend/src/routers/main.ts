import LeaderboardController from '../controllers/leaderboard.controller';
import MatchesController from '../controllers/matches.controller';
import TeamController from '../controllers/teams.controller';
import UserController from '../controllers/user.controller';
import LeaderboardService from '../services/leaderboardService';
import MatchesService from '../services/matchesService';
import TeamsService from '../services/teamService';
import UserService from '../services/user.servic';

const userService = new UserService();
const userController = new UserController(userService);

const teamsService = new TeamsService();
const teamsController = new TeamController(teamsService);

const matchsService = new MatchesService();
const matchsController = new MatchesController(matchsService);

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(
  teamsService,
  matchsService,
  leaderboardService,
);

export { userController, teamsController, matchsController, leaderboardController };
