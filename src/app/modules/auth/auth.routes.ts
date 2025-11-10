import express from "express";
import { authController } from "./auth.controller";
const router = express.Router();

router.post("/sign-up", authController.signUpAuth);
// router.post("/refresh-token", authController.refreshToken);
// router.post(
//   "/change-password",
//   auth(userRole.SUPER_ADMIN, userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT),
//   authController.changePassword
// );
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password", authController.resetPassword);

export const authRoutes = router;
