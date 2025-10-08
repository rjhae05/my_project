import express from "express";
import { register, login, getUsers } from "../controllers/usersController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, getUsers);

export default router;
