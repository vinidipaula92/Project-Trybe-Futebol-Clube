import { Router } from 'express';
import userController from './main';

const router = Router();

router.post('/', (req, res) => userController.Login(req, res));

export default router;
