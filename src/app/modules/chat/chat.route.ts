import express from 'express';
import { chatController } from './chat.controller';
import auth from '@/app/middleware/auth';

const router = express.Router();

router.post('/store', auth(), chatController.chatStoreBD);
router.get('/all', auth(), chatController.getUserChatBD);
router.get('/:id', auth(), chatController.getUserSingleChatBD);

// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
//   ValidateRequest(authValidation.changePasswordSchema),
//   authController.ChangePassword
// );

export const chatRoutes = router;
