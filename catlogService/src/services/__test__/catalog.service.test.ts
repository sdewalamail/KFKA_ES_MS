import { ICatalogRepository } from "../../interfaces/catalogRepository.interface";
import { Product } from "../../model/product.model";
import { MockCatalogRepository } from "../../repositry/mockCatalog.repositry";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";
import {Factory} from 'rosie';

const productFactory = new Factory<Product>()
  .attr("id", faker.number.int({ min: 1, max: 1000 }))
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 1, max: 100 }))
  .attr("price", +faker.commerce.price())

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 1000 }),
    ...rest
  }
}

describe("catalogService", () => {

  let repository: ICatalogRepository

  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  describe("catalogService", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({price: +faker.commerce.price()})
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
      const service = new CatalogService(repository);
      const reqBody = mockProduct({price: +faker.commerce.price()})
      
      jest.spyOn(repository, 'create').mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.createProduct(reqBody)).rejects.toThrow("Unable to create Product.");
    });

  });

  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });


  describe("updateProduct", () => {

    test("should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: +faker.commerce.price(),
        id: +faker.number.int({ min: 10, max: 100 }),
      })
      const result = await service.updateProduct(reqBody);
      expect(result).toMatchObject(reqBody);

    });

    test("should throw error product does not exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({ price: +faker.commerce.price() })

      jest
        .spyOn(repository, 'update')
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );

      await expect(service.updateProduct({})).rejects.toThrow("product does not exist");
    });

  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repository);
      const randomLimit = faker.number.int({ min: 10, max: 100 });
      const products = productFactory.buildList(randomLimit)

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products))
      const results = await service.getProducts(randomLimit, 0);
      //  console.log("Products ==>", results);
      expect(results.length).toEqual(randomLimit);
      expect(results).toMatchObject(products)
    })


    test("should throw error products does not exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({ price: +faker.commerce.price() })

      jest
        .spyOn(repository, 'find')
        .mockImplementationOnce(() =>
          Promise.reject(new Error("products does not exist"))
        );

      await expect(service.getProducts(0, 0)).rejects.toThrow("products does not exist");
    });

  });

  describe("getProduct", () => {
    test("should get product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build()

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));

      const results = await service.getProduct(product.id!);
      expect(results).toMatchObject(product)
    })
  });

  describe("deleteProduct", () => {
    test("should delete product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build()

      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve({id: product.id}));

      const results = await service.deleteProduct(product.id!);
      expect(results).toMatchObject({id: product.id});
    });


    test("should throw error product does not exist", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({ price: +faker.commerce.price() })

      jest
        .spyOn(repository, 'delete')
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist"))
        );

      await expect(service.deleteProduct(+faker.number.int({ min: 3, max: 15 }))).rejects.toThrow("product does not exist");
    });

  })

});



