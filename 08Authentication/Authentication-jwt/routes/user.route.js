import express from "express";
import {
  handleUserLogin,
  handleUserSignup,
  handleGetUser,
  handleUpdateUser,
} from "../controllers/user.controlller";
import { ensureAuthenticated } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", ensureAuthenticated, handleGetUser); //returns the current logged in user
router.patch("/update", ensureAuthenticated, handleUpdateUser);

// router.post('/login')
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;
