import express from "express";
import { SignIn, SignUp, Logout } from "../controllers/user.controller.js";
export const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/logout", Logout);
