import { app }  from "../src/app"
import supertest from 'supertest'
import client from "../src/database/prisma"
import { testFactory, userFactory } from "./factories"

beforeAll(async()=>{
    await client.$executeRaw`TRUNCATE TABLE users CASCADE`;
    await client.$executeRaw`TRUNCATE TABLE test;`;
});

let header : any = null; 

describe("POST /test", () =>{
    it("'/submit': given a valid body should return 201", async()=>{
        const body =  userFactory.__createUserData();
        await supertest(app).post("/user/sign-up").send(body);
        const login = userFactory.__submitValidData();
        const response = await supertest(app).post("/user/sign-in").send(login);
        header = response.body.config.headers.Authorization;
        const test = testFactory.validRequest();
        const result = await  supertest(app).post("/test/submit").set("Authorization", header).send(test)
        const status = result.status;
        expect(status).toEqual(201);
    });
    it("'/submit': given a invalid body should return 422", async()=>{
        const test = testFactory.invalidRequest();
        const result = await supertest(app).post("/test/submit").set("Authorization", header).send(test);
        const status = result.status;
        expect(status).toEqual(422);
    });
    it("'/submit': given a invalid token should return 401", async()=>{
        const test = testFactory.validRequest();
        const result = await supertest(app).post("/test/submit").set("Authorization", "alfava").send(test);
        const status = result.status;
        expect(status).toEqual(401);
    });
    it("'/submit': given a invalid categoryId should return 404", async()=>{
        const test = testFactory.invalidCategory();
        const result = await supertest(app).post("/test/submit").set("Authorization", header).send(test);
        const status = result.status;
        expect(status).toEqual(404);
    });
    it("'/submit': given a invalid teacherDisciplineId should return 404", async()=>{
        const test = testFactory.invalidRelation();
        const result = await supertest(app).post("/test/submit").set("Authorization", header).send(test);
        const status = result.status;
        expect(status).toEqual(404);
    });
});

describe("GET /test", ()=>{
    it("'/discipline': given a valid token should return 200 and a valid response", async()=>{
        const result = await supertest(app).get("/test/discipline").set("Authorization", header);
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
    });
    it("'/discipline: given a invalid token should return 401", async()=>{
        const result = await supertest(app).get("/test/discipline").set("Authorization", "not-a-token");
        expect(result.status).toEqual(401);
    });
    it("'/teacher': given a valid token should return 200 and a valid response", async()=>{
        const result = await supertest(app).get("/test/teacher").set("Authorization", header);
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
    });
    it("'/teacher: given a invalid token should return 401", async()=>{
        const result = await supertest(app).get("/test/teacher").set("Authorization", "not-a-token");
        expect(result.status).toEqual(401);
    });
})

afterAll(async () => {
    await client.$disconnect();
});
