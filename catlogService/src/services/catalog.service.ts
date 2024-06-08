import { ICatalogRepository } from "../interfaces/catalogRepository.interface";

export class CatalogService {
    private _repository: ICatalogRepository
    constructor(repository: ICatalogRepository) { this._repository = repository; }

    async createProduct(input: any) {
        const data = await this._repository.create(input);
        if (!data.id) throw new Error("Unable to create Product.");
        return data;
    };

    async updateProduct(input: any) {
        const data = await this._repository.update(input);
        // emit event to update record in Elastic search
        return data;
    };

    // instead of this we will search form Elastic search
    async getProducts(limit: number, offset: number) {
        const products = await this._repository.find(limit, offset);
        return products;
    };

    async getProduct(id: number) {
        const product = await this._repository.findOne(id);
        return product;
    };

    async deleteProduct(id: number) {
        if (!id) throw new Error("Unable to delete Product.");
        const product = await this._repository.delete(id);
        return product;
    }
};