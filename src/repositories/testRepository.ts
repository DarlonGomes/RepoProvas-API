import { byDiscipline } from "../controllers/testController";
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
            number: true,
            disciplines:{
                select:{
                    name: true,
                    TeacherDiscipline:{
                        select:{
                            Test:{
                                select:{
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    created_at: true,
                                    TeacherDiscipline:{
                                        select:{Teacher:{select:{name:true}}},
                                    },
                                    Category:{
                                        select: {name: true}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    const mappedList = list.map((period)=>{
        return{
            number: period.number,
            disciplines: period.disciplines.map(
                (discipline)=>{
                    return{
                        name: discipline.name,
                        tests: discipline.TeacherDiscipline[0].Test.map((test)=>{
                            return {
                                id: test.id,
                                name: test.name,
                                pdfUrl: test.pdfUrl,
                                created_at: test.created_at,
                                teacherName: test.TeacherDiscipline.Teacher.name,
                                category: test.Category.name
                            }
                        })
                    }
                }
            )
        }
    })
    return mappedList
}

export async function checkTestByUser (userId: number){

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
                        date: test.created_at
                    }
                }
            )
        }
    }) }
}))

return teachersDetails
}

// const list = await client.teacher.findMany({
//     select:{
//         name: true,
//         TeacherDiscipline:{
//             select:{
//                 Discipline:{
//                     select:{
//                         name: true,
//                         TeacherDiscipline:{
//                             select:{
//                                 Test:{
//                                     select:{
//                                         id: true,
//                                         name: true,
//                                         pdfUrl: true,
//                                         created_at: true,
//                                         Category:{
//                                             select:{
//                                                 name: true
//                                             }
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// });

// const mappedList = list.map((teacher)=>{
//     return{name: teacher.name,
//         disciplines: teacher.TeacherDiscipline.map(
//         (discipline) => {
//              return { name: discipline.Discipline.name,
//                  tests: discipline.Discipline.TeacherDiscipline[0].Test.map(
//                 (test) =>{
//                     return {
//                         id: test.id,
//                         name: test.name,
//                         pdfUrl: test.pdfUrl,
//                         created_at: test.created_at,
//                         category: test.Category.name
//                     }
//                 }
//              )}
//         })
//     }
// });