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