import client from "../database/prisma";
import { ITestInsert } from "../interfaces";

export async function create (test: ITestInsert){
    const createdTest = await client.test.create({
        data: test
    });
    return createdTest
}

export async function checkTestByDiscipline (disciplineId: number){

}

export async function checkTestByUser (userId: number){

}

export async function checkTestByTeacher(teacherId: number){

}