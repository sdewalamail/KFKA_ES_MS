import { ICatalogRepository } from "../interfaces/catalogRepository.interface";
import { Product } from "../model/product.model";

export class catalogRepository implements ICatalogRepository {
    constructor() {

    } create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): void {
        throw new Error("Method not implemented.");
    }
    find(): Promise<[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
}