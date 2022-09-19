import { ISignUp } from "../interfaces";
import { ErrorInfo } from "../middlewares/errorMiddleware"
import { userRepository, formRepository } from "../repositories"
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { encryptUtils } from "../utils";
import { validatorService } from ".";
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
