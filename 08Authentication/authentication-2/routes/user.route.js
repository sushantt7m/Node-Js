import express from "express";

import {
  handleUserSignup,
  handleUserLogin,
  handleGetUser,
  handleUpdateUser,
} from "../controllers/user.controller.js";

// import handleUserSignup from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", handleGetUser); //returns the current logged in user
router.patch("/update", handleUpdateUser);

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;
