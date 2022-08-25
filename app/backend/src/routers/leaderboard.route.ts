import { Router } from 'express';
import { leaderboardController } from './main';

const router = Router();

router.get('/home', (req, res) => leaderboardController.getTeamsHome(req, res));
router.get('/away', (req, res) => leaderboardController.getTeamsAway(req, res));
router.get('/', (req, res) => leaderboardController.getTeams(req, res));

export default router;
