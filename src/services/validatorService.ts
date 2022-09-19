import { ITestRequest } from "../interfaces";
import { ErrorInfo } from "../middlewares";
import { validationRepository } from "../repositories";

export async function checkCategoryId (categoryId: number){
    const validation = await validationRepository.ensureCategoryExists(categoryId);
    if(!validation) throw new ErrorInfo("error_not_found", "This category doesn't exists");
};

export async function checkTeacherDisciplineId (test: ITestRequest){
    
    const validation = await validationRepository.ensureTeacherDisciplineExists(test.teacherId, test.disciplineId);
    if(!validation) throw new ErrorInfo("error_not_found", "This relation doesn't exists");
    delete test.teacherId;
    delete test.disciplineId;
    return {...test, teacherDisciplineId: validation.id}
}

export async function checkDisciplineId(disciplineId: number){
    const validation = await validationRepository.ensureDisciplineExists(disciplineId);
    if(!validation) throw new ErrorInfo("error_not_found", "This discipline doesn't exists");
}

export async function checkTeacherId(teacherId: number){
    const validation = await validationRepository.ensureTeacherExists(teacherId);
    if(!validation) throw new ErrorInfo("error_not_found", "This teacher doesn't exists");
}

export async function checkUserId (userId: number){
    const validation = await validationRepository.ensureUserExists(userId);
    if(!validation) throw new ErrorInfo("error_not_found", "This user doesn't exists");
}