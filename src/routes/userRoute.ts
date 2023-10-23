import protect from "../middleware/authMiddleware";
import {
  login,
  register,
  updateUserProfile,
  userProfile,
} from "../controllers/user";
import express from "express";

const router = express.Router();

// Login
router.post("/login", login);

// Register
router.post("/register", register);

// Profile, Update profile and protect middleware for check auth
router.use("/profile", protect);
router.route("/profile").get(userProfile).put(updateUserProfile);

export default router;
