"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
class CatalogService {
    _repository;
    constructor(repository) { this._repository = repository; }
    async createProduct(input) {
        const data = await this._repository.create(input);
        if (!data.id)
            throw new Error("Unable to create Product.");
        return data;
    }
    ;
    async updateProduct(input) {
        const data = await this._repository.update(input);
        // emit event to update record in Elastic search
        return data;
    }
    ;
    // instead of this we will search form Elastic search
    async getProducts(limit, offset) {
        const products = await this._repository.find(limit, offset);
        return products;
    }
    ;
    getProduct(id) { }
    ;
}
exports.CatalogService = CatalogService;
;
