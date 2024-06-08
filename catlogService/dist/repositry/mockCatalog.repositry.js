"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCatalogRepository = void 0;
class MockCatalogRepository {
    create(data) {
        const mockProduct = {
            id: 123,
            ...data
        };
        return Promise.resolve(mockProduct);
    }
    update(data) {
        return Promise.resolve(data);
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    find(limit, offset) {
        return Promise.resolve([]);
    }
    findOne(id) {
        throw new Error("Method not implemented.");
    }
}
exports.MockCatalogRepository = MockCatalogRepository;
