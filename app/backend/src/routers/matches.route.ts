import { Router } from 'express';
import { matchsController } from './main';

const router = Router();

router.get('/', (req, res) => matchsController.getMatches(req, res));
router.post('/', (req, res) => matchsController.getSaveMatch(req, res));

export default router;
