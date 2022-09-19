import client from "../database/prisma";
import { ISignUp } from "../interfaces";

export async function create (account: ISignUp){
    const response = await client.user.create({
        data: account
    });
    return response
}

export async function checkData (email: string){
    const account = await client.user.findUnique({
        where:{
            email: email
        }
    });
    return account
}

export async function getAllEmails(){
    const emails = await client.user.findMany({
        select:{
            email: true
        }
    });
    return emails
}
