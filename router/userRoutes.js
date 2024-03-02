import { Router } from "express";
import {
  getById,
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

//Register and login routes

router.post("/register", registerUser);

router.post("/login", isAuthenticated, loginUser);

router.get("/logout", logoutUser);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/userid/:id", getById);

export default router;
