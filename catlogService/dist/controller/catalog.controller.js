"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCatalog = async (req, res, next) => {
    return res.send("Express + TypeScript Server");
};
// you can simply write this type to
// const getHandler: RequestHandler = (req, res, next) => {
//   return res.send("Express + TypeScript Server hhrkeh");
// }
// app.get("/", getHandler);
exports.default = { createCatalog };
