import { Request, Response } from "express";
import { testService, validatorService } from "../services";
import { ITestRequest } from "../interfaces";

export async function insertion (req: Request, res: Response){
    const {userId} = res.locals.userId;
    const testRequest : ITestRequest = req.body;
    await validatorService.checkUserId(userId);
    await validatorService.checkCategoryId(testRequest.categoryId);
    await validatorService.checkTeacherDisciplineId(testRequest.teacherDisciplineId);
    const testWithUserId = await testService.insertUserId(testRequest, userId);
    const createdTest = await testService.testCreation(testWithUserId);

    return res.status(201).send({message:"You test has been created.", data: createdTest})
}

export async function byDiscipline (req: Request, res: Response){
    const {userId} = res.locals.userId;
    // const {disciplineId} = req.params;
    await validatorService.checkUserId(userId);
    //  await validatorService.checkDisciplineId();
    const response = await testService.listTestByDiscipline()
     return res.status(200).send(response)
}

export async function byTeacher (req: Request, res: Response){
    const {userId} = res.locals.userId;
    // const {teacherId} = req.params;
    await validatorService.checkUserId(userId);
    // await validatorService.checkTeacherId(Number(teacherId));
    const response = await testService.listTestByTeacher();
    return res.status(200).send(response);
}