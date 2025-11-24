import express from 'express';
import { userController } from './user.controller';


const router = express.Router();

router.get(
  '/',
  userController.UserGetBD
);
router.post("/register", userController.userStoreBD);
router.post(
  '/login',
  userController.loginUser
);
router.get(
  '/refresh-token',
  userController.refreshTokenBD
);
// router.post(
//   '/change-password',
//   auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
//   ValidateRequest(authValidation.changePasswordSchema),
//   authController.ChangePassword
// );

export const userRoutes = router;
