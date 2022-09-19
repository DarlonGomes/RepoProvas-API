import { ITestPartial, ITestInsert } from "../interfaces";
import { testRepository } from "../repositories";
import dayjs from "dayjs";

export async function insertUserId (request: ITestPartial, userId: number){
    const date = dayjs().format("YYYY/MM")
    const newRequest : ITestInsert = {...request, userId: userId, date: date}
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