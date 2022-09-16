import client from "../database/prisma";

export async function ensureCategoryExists (categoryId: number){
    const response = client.category.findUnique({
        where:{
            id: categoryId
        }
    });
    return response
};

export async function ensureTeacherDisciplineExists (teacherDisciplineId: number){
    const response = client.teacherDiscipline.findUnique({
        where:{
            id: teacherDisciplineId
        }
    });
    return response
}

export async function ensureDisciplineExists (disciplineId: number){
    const response = client.discipline.findUnique({
        where:{
            id: disciplineId
        }
    });
    return response
};

export async function ensureTeacherExists (teacherId: number){
    const response = client.teacher.findUnique({
        where:{
            id: teacherId
        }
    });
    return response
}

export async function ensureUserExists (userId: number){
    const response = client.user.findUnique({
        where:{
            id: userId
        }
    });
    return response
}