"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockCatalog_repositry_1 = require("../../repositry/mockCatalog.repositry");
const catalog_service_1 = require("../catalog.service");
const faker_1 = require("@faker-js/faker");
const rosie_1 = require("rosie");
const productFactory = new rosie_1.Factory()
    .attr("id", faker_1.faker.number.int({ min: 1, max: 1000 }))
    .attr("name", faker_1.faker.commerce.productName())
    .attr("description", faker_1.faker.commerce.productDescription())
    .attr("stock", faker_1.faker.number.int({ min: 1, max: 100 }))
    .attr("price", +faker_1.faker.commerce.price());
const mockProduct = (rest) => {
    return {
        name: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        stock: faker_1.faker.number.int({ min: 10, max: 1000 }),
        ...rest
    };
};
describe("catalogService", () => {
    let repository;
    beforeEach(() => {
        repository = new mockCatalog_repositry_1.MockCatalogRepository();
    });
    describe("catalogService", () => {
        test("should create product", async () => {
            const service = new catalog_service_1.CatalogService(repository);
            const reqBody = mockProduct({ price: +faker_1.faker.commerce.price() });
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number)
            });
        });
        test("should throw error product is already exist", async () => {
            const service = new catalog_service_1.CatalogService(repository);
            const reqBody = mockProduct({ price: +faker_1.faker.commerce.price() });
            jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.resolve({}));
            await expect(service.createProduct(reqBody)).rejects.toThrow("Unable to create Product.");
        });
    });
    afterEach(() => {
        repository = {};
    });
    describe("updateProduct", () => {
        test("should create product", async () => {
            const service = new catalog_service_1.CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker_1.faker.commerce.price(),
                id: +faker_1.faker.number.int({ min: 10, max: 100 }),
            });
            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody);
        });
        test("should throw error product does not exist", async () => {
            const service = new catalog_service_1.CatalogService(repository);
            const reqBody = mockProduct({ price: +faker_1.faker.commerce.price() });
            jest
                .spyOn(repository, 'update')
                .mockImplementationOnce(() => Promise.reject(new Error("product does not exist")));
            await expect(service.updateProduct({})).rejects.toThrow("product does not exist");
        });
    });
    describe("getProduct", () => {
        test("should get products by offset and limit", async () => {
            const service = new catalog_service_1.CatalogService(repository);
            const randomLimit = faker_1.faker.number.int({ min: 10, max: 100 });
            const products = productFactory.buildList(randomLimit);
            jest
                .spyOn(repository, "find")
                .mockImplementationOnce(() => Promise.resolve(products));
            const results = await service.getProducts(randomLimit, 0);
            //  console.log("Products ==>", results);
            expect(results.length).toEqual(randomLimit);
            expect(results).toMatchObject(products);
        });
        test("should throw error products does not exist", async () => {
            const service = new catalog_service_1.CatalogService(repository);
            const reqBody = mockProduct({ price: +faker_1.faker.commerce.price() });
            jest
                .spyOn(repository, 'find')
                .mockImplementationOnce(() => Promise.reject(new Error("products does not exist")));
            await expect(service.getProducts(0, 0)).rejects.toThrow("products does not exist");
        });
    });
});
