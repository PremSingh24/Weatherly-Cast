import { Router } from "express";
import authenticateJwt from "../middleware/auth.js";
import {
  registerUserHandler,
  loginUserHandler,
  authenticateUserHandler,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(registerUserHandler);
router.route("/login").post(loginUserHandler);
router.route("/authenticate").get(authenticateJwt, authenticateUserHandler);

export default router;
