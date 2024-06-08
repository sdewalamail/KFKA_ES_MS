import { Request, Response, NextFunction } from "express";
import { CatalogService } from "../services/catalog.service";
import { catalogRepository } from "../repositry/catalog.repositry";


const catalogService = new CatalogService(new catalogRepository())

const createCatalog = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({});
};

// you can simply write this type to

// const getHandler: RequestHandler = (req, res, next) => {
//   return res.send("Express + TypeScript Server hhrkeh");
// }

// app.get("/", getHandler);

export default { createCatalog };