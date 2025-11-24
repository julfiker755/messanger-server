import express from 'express';
import { userController } from './user.controller';
import validateRequest from '@/app/shared/validateRequest';
import { user_sc } from '@/ulits/schema';

const router = express.Router();

router.get('/all', userController.userGetBD);
router.post('/register',validateRequest(user_sc), userController.userStoreBD);
router.post('/login', userController.loginUser);
router.get('/logout', userController.loginLogout);


export const userRoutes = router;
