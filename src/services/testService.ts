import { ITestInsert, ITestRequest } from "../interfaces";
import { ErrorInfo } from "../middlewares";
import { testRepository, validationRepository } from "../repositories";

export async function insertUserId (request: ITestRequest, userId: number){
    const newRequest : ITestInsert = {...request, userId: userId}
    return newRequest
}
export async function testCreation(test: ITestInsert){
    const createdTest = await testRepository.create(test);
    return createdTest
}

export async function checkCategoryId (categoryId: number){
    const validation = await validationRepository.ensureCategoryExists(categoryId);
    if(!validation) throw new ErrorInfo("error_not_found", "This category doesn't exists");

};

export async function checkTeacherDisciplineId (teacherDisciplineId: number){
    const validation = await validationRepository.ensureTeacherDisciplineExists(teacherDisciplineId);
    if(!validation) throw new ErrorInfo("error_not_found", "This relation doesn't exists");
}