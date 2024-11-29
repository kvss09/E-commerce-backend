import express from "express";
import { SignIn, SignUp } from "../controllers/user.controller.js";
export const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
