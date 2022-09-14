import { app }  from "../src/app"
import supertest from 'supertest'
import client from "../src/database/prisma"

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users;`;
  });
describe("POST /user", ()=>{
    it("'/sign-up': given a invalid body should return 422", async () =>{
        const body = {
            email: "valdomiro@icloud.com",
            password: "12340987",
        };
        const result = await supertest(app).post("/user/sign-up").send(body);
        const status = result.status;
        expect(status).toEqual(422);
    });
    it("'/sign-up': given a valid body should return 422", async () =>{
        const body = {
            email: "valdomiro@icloud.com",
            password: "12340987",
            confirmPassword: "12345678"
        }
        const result = await supertest(app).post("/user/sign-up").send(body);
        const status = result.status;
        expect(status).toEqual(422);
    });
    it("'/sign-up': given a valid body should return 201", async () =>{
        const body = {
            email: "valdomiro@icloud.com",
            password: "12340987",
            confirmPassword: "12340987"
        }
        const result = await supertest(app).post("/user/sign-up").send(body);
        const status = result.status;
        expect(status).toEqual(201);

    });
});

afterAll(async () => {
    await client.$disconnect();
});
