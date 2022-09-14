import { Router } from "express";
import { userController } from "../controllers";
import { joiValidation } from "../middlewares";

export const userRouter = Router();

userRouter.post("/sign-up", joiValidation.signUp, userController.signUp);
userRouter.post("/sign-in", joiValidation.signIn, userController.signIn);
