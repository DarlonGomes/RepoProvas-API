import client  from "../src/database/prisma"

async function main (){
    const account = {
        email: "valdomiro@icloud.com",
        password: "12340987"
    }
    await client.user.create({data: account})
}