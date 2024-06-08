import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';
import catalogRouter from '../catalog.routes';

const app = express();


app.use(express.json());

app.use("/", catalogRouter);

const mockRequest = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 10, max: 1000 }),
        price: +faker.commerce.price()
    }
};


describe("Catalog Routes", () => {
    describe("POST /product", () => {
        test("should create product successfully", async () => {
            const requestBody = mockRequest()
           const response = await request(app)
           .post("/product")
           .send(requestBody)
           .set("Accept", "application/json");

           console.dir(requestBody, {depth: 500});
           expect(response.status).toBe(201);
        })
    });
});