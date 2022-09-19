import { Request, Response } from "express";
import { testService, validatorService } from "../services";
import { ITestRequest } from "../interfaces";
import { getUsersEmails } from "../services/userService";


export async function insertion (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const testRequest : ITestRequest = req.body;
    await validatorService.checkCategoryId(testRequest.categoryId);
    const test = await validatorService.checkTeacherDisciplineId(testRequest);
    const testWithUserId = await testService.insertUserId(test, userId);
    const createdTest = await testService.testCreation(testWithUserId);
    await getUsersEmails(createdTest)
    return res.status(201).send({message:"You test has been created.", data: createdTest})
}

export async function byDiscipline (req: Request, res: Response){
    const response = await testService.listTestByDiscipline()
     return res.status(200).send(response)
}

export async function byTeacher (req: Request, res: Response){
    const response = await testService.listTestByTeacher();
    return res.status(200).send(response);
}