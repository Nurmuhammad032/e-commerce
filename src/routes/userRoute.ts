import { login, register } from "../controllers/user";
import express from "express";

const router = express.Router();

// Login
router.post("/login", login);

// Register
router.post("/login", register);

export default router;
