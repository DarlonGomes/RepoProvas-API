import { app }  from "../src/app"
import supertest from 'supertest'
import client from "../src/database/prisma"
import { userFactory } from "./factories"

beforeAll(async () => {
    await client.$executeRaw`TRUNCATE TABLE users CASCADE`;
  });
describe("POST /user", ()=>{
    it("'/sign-up': given a valid body should return 201", async () =>{
        const body =  userFactory.__createUserData();
        const result = await supertest(app).post("/user/sign-up").send(body);
        const status = result.status;
        expect(status).toEqual(201);
    });
    it("'/sign-up': given a invalid body that already exists return 409", async () =>{
        const body =  userFactory.__createExistentUserData()
        const result = await supertest(app).post("/user/sign-up").send(body);
        const status = result.status;
        expect(status).toEqual(409);

    });
    it("'/sign-up': given a valid body that already exists return 422", async () =>{
        const body =  userFactory.__createUserInvalidDataJOI()
        const result = await supertest(app).post("/user/sign-up").send(body);
        const status = result.status;
        expect(status).toEqual(422);

    });
    it("'/sign-in': given a invalid body should return 422", async () =>{
        const body =  userFactory.__submitInvalidDataJOI()
        const result = await supertest(app).post("/user/sign-in").send(body);
        const status = result.status;
        expect(status).toEqual(422);
    });
    it("'/sign-in': given a valid body with wrong password should return 409", async () =>{
        const body =  userFactory.__submitInvalidPasswordData()
        const result = await supertest(app).post("/user/sign-in").send(body);
        const status = result.status;
        expect(status).toEqual(409);
    });
    it("'/sign-in': given an account that doesn't exist should return 404", async () =>{
        const body =  userFactory.__submitUnexistentData()
        const result = await supertest(app).post("/user/sign-in").send(body);
        const status = result.status;
        expect(status).toEqual(404);
    });
    it("'/sign-in': given a valid body and existing account, should return 200", async () =>{
        const body = userFactory.__submitValidData()
        const result = await supertest(app).post("/user/sign-in").send(body);
        const status = result.status;
        expect(status).toEqual(200);
    });
});

afterAll(async () => {
    await client.$disconnect();
});

