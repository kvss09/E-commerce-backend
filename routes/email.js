import express from "express";
import { SignIn, SignUp } from "../controllers/user.controller.js";
export const emaiRouter = express.Router();
import { sendEmailController } from "../controllers/EmailController.js";
emaiRouter.post("/", sendEmailController);
