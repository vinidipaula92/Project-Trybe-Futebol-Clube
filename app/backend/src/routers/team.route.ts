import { Router } from 'express';
import { teamsController } from './main';

const router = Router();

router.get('/', (req, res) => teamsController.getTeams(req, res));
router.get('/:id', (req, res) => teamsController.getTeamById(req, res));

export default router;
