import { Test } from "@prisma/client";

export interface ITestRequest extends Omit<Test, "id" | "created_at" | "userId" | "teacherDisciplineId">{
    disciplineId?: number;
    teacherId?: number
}

export interface ITestPartial extends Omit<Test, "id" | "created_at" | "userId" >{

}

export interface ITestInsert extends Omit<Test, "id" | "created_at" >{
}
