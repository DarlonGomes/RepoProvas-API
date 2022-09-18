import { ITestInsert, ITestRequest } from "../interfaces";
import { testRepository } from "../repositories";
import dayjs from "dayjs";

export async function insertUserId (request: ITestRequest, userId: number){
    const date = dayjs().format("YYYY/MM")
    const newRequest = {...request, userId: userId, created_at: date}
    return newRequest
}
export async function testCreation(test: ITestInsert){
    const createdTest = await testRepository.create(test);
    return createdTest
}

export async function listTestByDiscipline (){
    const response = await testRepository.checkTestByDiscipline()
    return response
}


export async function listTestByTeacher (){
    const response = await testRepository.checkTestByTeacher();
    return response
}