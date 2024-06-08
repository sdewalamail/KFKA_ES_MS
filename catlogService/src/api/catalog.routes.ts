import express from "express";
import CATALOG from "../controller/catalog.controller";

const router = express.Router();

// End Points 
router.post("/product", CATALOG.createCatalog);

export default router;