
  export function __createUserData(){
    return {
        email: "valdomiro@icloud.com",
        password: "12340987",
        confirmPassword: "12340987"
    }
  }


  export function __createUserInvalidDataJOI(){
    return {
        email: "valdo@icloud.com",
        password: "12340987",
        confirmPassword: "12340977",
    }
  }

  export function __createExistentUserData(){
  const body = {
    email: "valdomiro@icloud.com",
    password: "12340987",
    confirmPassword: "12340987"
  }
    return body
  }

  export function __submitValidData(){
    return {
            email: "valdomiro@icloud.com",
            password: "12340987",
        }
  }

  export function __submitInvalidDataJOI(){
    return {
            email: "valdomiro@icloud.com",
            password: "12"
        }
  }

  export function __submitInvalidPasswordData(){

    return {
      email:"valdomiro@icloud.com",
      password: "12341234"
    }
  }

  export function __submitUnexistentData(){
    return {
            email: "valdinhobala@icloud.com",
            password: "12340987",
        }
  }
