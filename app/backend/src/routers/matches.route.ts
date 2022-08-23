import { Router } from 'express';
import { matchsController } from './main';

const router = Router();

router.get('/', (req, res) => matchsController.getMatches(req, res));
router.post('/', (req, res) => matchsController.getSaveMatch(req, res));
router.patch('/:id/finish', (req, res) => matchsController.finishMatch(req, res));
router.patch('/:id', (req, res) => matchsController.updateMatch(req, res));

export default router;
