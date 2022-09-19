import client from "../database/prisma";

export async function ensureCategoryExists (categoryId: number){
    const response = client.category.findUnique({
        where:{
            id: categoryId
        }
    });
    return response
};

export async function ensureTeacherDisciplineExists (teacherId: number | undefined, disciplineId: number | undefined){
    const response = client.teacherDiscipline.findFirst({
        where:{
            teacherId: teacherId,
            disciplineId: disciplineId
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