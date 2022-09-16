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
        include:{
            Discipline: {
                include:{
                    TeacherDiscipline:{
                        include:{
                            Test: {
                                include:{
                                    Category: {
                                        include: {
                                            Test : {
                                                include: {
                                                    TeacherDiscipline :{
                                                        include:{
                                                            Teacher : {
                                                                select:{
                                                                    name: true
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    );
   
    const betterList = list.map(
        (period)=>{
            return { ...period, Discipline: period.Discipline.map(
                (discipline) => {
                    return { ...discipline, TeacherDiscipline: discipline.TeacherDiscipline.map(
                        (relation) => {
                            return { exames : relation.Test.map(
                                (test) => {
                                    return  test.Category
                                }
                            )}
                        }
                    )}
                }
            )}
        })
    return betterList
}

export async function checkTestByUser (userId: number){

}

export async function checkTestByTeacher(){

const list = await client.teacher.findMany({
    include:{
        TeacherDiscipline :{
            include:{
                Test :{
                    include :{
                        Category : {
                            include: {
                                Test : true
                            }
                        }
                    }
                }
            }
        }
    }
});

const betterList = list.map(
    (teacher)=>{
        return{ id: teacher.id, name:teacher.name, relation: teacher.TeacherDiscipline.map(
            (relation) =>{
                return {id: relation.id, summary: relation.Test.map(
                    (categories)=>{
                        return { category: categories.Category}
                    }
                )}
            }
        )}
    }
)
return betterList
    
    // const betterMap = list.map(
    //     (teacher)=>{
    //         return{id: teacher.id, name: teacher.name, summary: teacher.TeacherDiscipline.map(
    //             (container) =>{
    //                 if(container.Test.length === 0) return 
    //                 else{
    //                     return {container: container.Test}
    //                 }
    //             }
    //         )}
    //     }
    // )
    // const betterList = list.map(
    //     (teacher)=>{
    //         return{ id: teacher.id, name:teacher.name, relation: teacher.TeacherDiscipline.map(
    //             (relation) =>{
    //                 return {id: relation.id, summary: relation.Test.map(
    //                     (categories)=>{
    //                         return { category: categories.Category}
    //                     }
    //                 )}
    //             }
    //         )}
    //     }
    // )

}
// //TEST 
// const list = await client.teacher.findMany({
//     include:{
//         TeacherDiscipline :{
//             select:{
//                 Discipline:{
//                     select: {
//                         name: true
//                     }
//                 },
//                 Test:{
//                     include:{
//                         Category:{
//                             include:{
//                                 Test: true
//                             }
//                         }
//                     }
//                 }
//             },
//     }
// }});


// //actual
// const list = await client.teacher.findMany({
//     include:{
//         TeacherDiscipline :{
//             include:{
//                 Test :{
//                     include :{
//                         Category : {
//                             include: {
//                                 Test : true
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// });

// const betterList = list.map(
//     (teacher)=>{
//         return{ id: teacher.id, name:teacher.name, relation: teacher.TeacherDiscipline.map(
//             (relation) =>{
//                 return {id: relation.id, summary: relation.Test.map(
//                     (categories)=>{
//                         return { category: categories.Category}
//                     }
//                 )}
//             }
//         )}
//     }
// )
// return betterList