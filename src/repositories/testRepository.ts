import client from "../database/prisma";
import { ITestInsert } from "../interfaces";

export async function create (test: ITestInsert){
    
    const createdTest = await client.test.create({
        data: test
    });
    return createdTest
}

export async function checkTestByDiscipline (){
    const list = await client.term.findMany({
        select:{
            id: true,
            number: true,
            Discipline:{
                select:{
                    id:true,
                    name: true
                }
            }
        }
    });
   
    const addCategories = await Promise.all(list.map(async (period)=>{
        const category = await client.category.findMany({
            select:{
                id:true,
                name: true,
                Test: {
                    select:{
                        id:true,
                        name: true,
                        pdfUrl: true,
                        date: true,
                        created_at:true,
                        TeacherDiscipline:{
                            select:{
                                disciplineId: true,
                                Teacher:{
                                    select:{
                                        name: true
                                    }
                                }
                            }
                        }
                    },orderBy:{
                        created_at: "asc"
                    }
                }
                
            }
        });
        const withCategory = {
            number: period.number,  
            disciplines: period.Discipline.map(
                (discipline)=>{
                    return{
                        id: discipline.id,
                        name: discipline.name,
                        categories: category.map((category)=>{
                            return{
                                id: category.id,
                                name: category.name,
                                tests: category.Test.map((test)=>{
                                    if(test.TeacherDiscipline.disciplineId === discipline.id){
                                        return{
                                            id: test.id,
                                            name: test.name,
                                            pdfUrl: test.pdfUrl,
                                            date: test.date,
                                            disciplineId: test.TeacherDiscipline.disciplineId,
                                            teacherName: test.TeacherDiscipline.Teacher.name
                                        }
                                    }
                                }).filter((testElement)=> testElement )
                            }
                        }).filter((categoryElement)=> categoryElement.tests.length > 0)
                    }
                }
            )
        };

        return withCategory
    }));


    return addCategories
}

export async function checkTestByTeacher(){
const teacherList = await client.teacher.findMany({
    select:{
        id: true,
        name:true
}});

const teachersDetails = await Promise.all(teacherList.map(async (teacher)=>{
    const property = await client.category.findMany({
        select:{
            name: true,
            Test:{
                select:{
                    id: true,
                    name: true,
                    pdfUrl: true,
                    teacherDisciplineId: true,
                    created_at: true,
                    date: true,
                    TeacherDiscipline:{
                        select:{
                            Discipline:{
                                select:{
                                    name: true
                                }
                            }
                        }
                    }
                    
                }, where:{
                    TeacherDiscipline:{
                        teacherId: teacher.id
                    }
                }, orderBy :{
                    created_at: "asc"
                }
            }
        }
    });

    return {...teacher, details: property.map((property)=>{
        return{
            name: property.name,
            tests: property.Test.map(
                (test)=>{
                    return{
                        id: test.id,
                        name: test.name,
                        pdfUrl: test.pdfUrl,
                        discipline: test.TeacherDiscipline.Discipline.name,
                        date: test.date
                    }
                }
            )
        }
    }).filter((detailElement)=> detailElement.tests.length > 0) }
}))

return teachersDetails
}
