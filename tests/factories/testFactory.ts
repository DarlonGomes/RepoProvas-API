
export function invalidRequest(){
  return {
    "name": "Cineflex",
    "pdfUrl": "https://www.greatestpdf.com",
    "categoryId": -1,
    "teacherId": -1,
    "disciplineId": 3
  }
}

export function validRequest(){
  return {
    name: "I'm not good at this",
    pdfUrl: "https://www.isuckatplanning.com",
    categoryId: 1,
    teacherId: 2,
    disciplineId: 5,
  }
}

export function invalidCategory(){
  return {
    "name": "Cineflex",
    "pdfUrl": "https://www.greatestpdf.com",
    "categoryId": 7,
    "teacherId": 1,
    "disciplineId": 3
  }
}

export function invalidRelation(){
  return {
    "name": "Cineflex",
    "pdfUrl": "https://www.greatestpdf.com",
    "categoryId": 1,
    "teacherId": 4,
    "disciplineId": 3
  }
}