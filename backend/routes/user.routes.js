import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { currentUserController, loginController, logoutController, registerController,verifyEmail} from '../controllers/user.controller.js';


export const router = express.Router()

router.get("/current-user",authMiddleware,currentUserController)
router.post("/register",registerController);
router.get("/verify/:token",verifyEmail)
router.post("/login",loginController);
router.post("/logout",logoutController);