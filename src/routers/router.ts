import { Router } from "express";
import { testRouter } from "./testRouter";
import { userRouter } from "./userRouter";

export const router = Router();

router.use("/user", userRouter);
router.use("/test", testRouter);
