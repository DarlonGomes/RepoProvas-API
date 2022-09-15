
export function invalidRequest(){
    return {
        "name": "",
        "pdfUrl": "https://",
        "categoryId": -3,
        "teacherDisciplineId": 3
      }
}

export function validRequest(){
    return {
        "name": "Cineflex",
        "pdfUrl": "https://www.greatestpdf.com",
        "categoryId": 1,
        "teacherDisciplineId": 3
      }
}

export function invalidCategory(){
  return {
    "name": "Cineflex",
    "pdfUrl": "https://www.greatestpdf.com",
    "categoryId": 30,
    "teacherDisciplineId": 3
  }
}

export function invalidRelation(){
  return {
    "name": "Cineflex",
    "pdfUrl": "https://www.greatestpdf.com",
    "categoryId": 1,
    "teacherDisciplineId": 99
  }
}