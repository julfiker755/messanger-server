import express from 'express';
import { chatController } from './chat.controller';


const router = express.Router();

router.get(
  '/store',
  chatController.chatStoreBD
);

// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
//   ValidateRequest(authValidation.changePasswordSchema),
//   authController.ChangePassword
// );

export const chatRoutes = router;
