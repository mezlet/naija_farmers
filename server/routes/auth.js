import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = new Router();

router.post('/register', AuthMiddleware.register, AuthController.register);
router.post('/login', AuthMiddleware.login, AuthController.login);
router.get('/permissions', AuthMiddleware.permissions, AuthController.permissions);
router.get('/confirmation',AuthMiddleware.confirmationToken, AuthController.confirmToken);


export default router;
