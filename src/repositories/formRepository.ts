import client from "../database/prisma";

export async function categoryInfo(){
    const response = await client.category.findMany({
        select:{
            name: true,
            id: true
        }
    });

    const rearrengeResponse = response.map((e)=> {return{label: e.name, id: e.id}});
    return rearrengeResponse;
}

export async function disciplineInfo(){
    const response = await client.discipline.findMany({
        select:{
            name: true,
            id: true,
            TeacherDiscipline:{
                select:{
                    teacherId: true
                }
            }
        }
    });

    const rearrengeResponse = response.map((e)=>{return{label: e.name, id: e.id, teacherId: e.TeacherDiscipline[0].teacherId}});
    return rearrengeResponse;
}

export async function teacherInfo(){
    const response = await client.teacher.findMany({
        select:{
            name: true,
            id: true
        }
    });
    const rearrengeResponse = response.map((e)=>{return{label: e.name, id: e.id}});
    return rearrengeResponse
}