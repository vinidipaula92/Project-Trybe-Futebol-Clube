import { Router } from 'express';
import { userController } from './main';

const router = Router();

router.post('/', (req, res) => userController.Login(req, res));
router.get('/validate', (req, res) => userController.getRole(req, res));

export default router;
