import express from "express";
const router = express.Router();
import { handleGetAllUsers } from "../controllers/user.controlller";
import {
  ensureAuthenticated,
  restrictToRole,
} from "../middlewares/auth.middleware";

const restrictToAdmin = restrictToRole("ADMIN");

router.get(
  "/users",
  ensureAuthenticated,
  restrictToAdmin,
  handleGetAllUsers,
);

export default router;
