"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catalog_controller_1 = __importDefault(require("../controller/catalog.controller"));
const router = express_1.default.Router();
// End Points 
router.post("/product", catalog_controller_1.default.createCatalog);
exports.default = router;
