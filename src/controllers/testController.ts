import { Request, Response } from "express";
import { testService } from "../services";
import { ITestRequest } from "../interfaces";

export async function insertion (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const testRequest : ITestRequest = req.body;

    const testWithUserId = await testService.insertUserId(testRequest, userId);
    const createdTest = await testService.testCreation(testWithUserId);

    return res.status(201).send({message:"You test has been created.", data: createdTest})
}