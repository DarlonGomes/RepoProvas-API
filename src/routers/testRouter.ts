import { Router } from "express";
import { testController, userController } from "../controllers";
import { joiValidation, tokenValidation } from "../middlewares";

export const testRouter = Router();

testRouter.post("/submit", tokenValidation, joiValidation.testFormat, testController.insertion);
testRouter.get("/discipline/:id", tokenValidation);
testRouter.get("/teacher/:id", tokenValidation)