import { ISignUp } from "../interfaces";
import { ErrorInfo } from "../middlewares/errorMiddleware"
import { userRepository, formRepository } from "../repositories"
import jwt from "jsonwebtoken";
import { Test, User } from "@prisma/client";
import { encryptUtils } from "../utils";
import { validatorService } from ".";
import sgMail from "@sendgrid/mail";
import axios from "axios";

export async function checkEmail (email: string, method: "sign-in" | "sign-up" ) : Promise<User | undefined>{
    const account : User | null = await userRepository.checkData(email);
    if(method === "sign-up" && account)throw new ErrorInfo("error_conflict", "An account with this email already exists")
    if(method === "sign-in"){
        if(!account)throw new ErrorInfo("error_not_found", "This account doesn't exist")
        return account
    }
}

export async function doesPasswordMatch(password: string, confirmPassword: string){
    if(password !== confirmPassword) throw new ErrorInfo("error_conflict", "Your passwords do not match")
};


export async function archiveAccount (account: ISignUp) : Promise<User>{
    delete account.confirmPassword
    const accountWithHashedPassword : ISignUp = await hashUserPassword(account);
    const response : User = await userRepository.create(accountWithHashedPassword);
    return response;
};

async function hashUserPassword (account: ISignUp) : Promise<ISignUp>{
    const hashPassword : string = encryptUtils.hashDataBcrypt(account.password)
    account.password = hashPassword
    return account
};

export async function comparePassword (password: string, hashPassword:string){
    const isPasswordValid : boolean = encryptUtils.validateBcryptData(password, hashPassword);
    if(!isPasswordValid) throw new ErrorInfo("error_conflict", "Incorrect password")
};

export async function generateToken(id: number) {
    const token : string = jwt.sign({userId: id}, process.env.TOKEN_SECRET!, {expiresIn: process.env.TOKEN_EXPIRES_IN})
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    return config
};

export async function formOption(){
    const categories = await formRepository.categoryInfo();
    const disciplines = await formRepository.disciplineInfo();
    const teachers = await formRepository.teacherInfo();

    const data = {
        categories: categories,
        disciplines: disciplines,
        teachers: teachers
    };

    return data
}

export async function getGitAuth (code: any){
    const config = {
        headers:{
            Accept: "application/json"
        }
    }
    const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}`, {}, config);
    const githubUserConfig = {
        headers:{
        Authorization: "Bearer "+ response.data.access_token
        }
    }
    return githubUserConfig
}

export async function getGitDetails (config : any){
    const githubResponse = await axios.get("https://api.github.com/user?scope=user:email", config)
    const userEmail = githubResponse.data.email;
    if(userEmail){
        const existingUserConfig = await validatorService.checkUserEmail(userEmail)
        if(existingUserConfig) return existingUserConfig
    }
    const newUserConfig = await generateToken(githubResponse.data.id);
    return newUserConfig
}

export async function getUsersEmails(test: Test){
 const emails = await userRepository.getAllEmails();
  await sendEmailsToCustomers(emails, test);
}

export async function sendEmailsToCustomers(emails: any, test: Test){
    sgMail.setApiKey(process.env.SENDGRID_API!);
    await Promise.all(emails.map(async(e : any)=>{
        const msg = {
            to: e.email,
            from: "darlonfgomes@gmail.com", // Use the email address or domain you verified above
            subject: "A new test has been published",
            test: `The following test has been published: ${test.name} `,
            html: `<h1>The following test has been published: ${test.name}</h1> `,
          };
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.log(error)
        }
        return
    }));
}