import express from "express";
import { getProducts, getProduct } from "../controllers/product";

const router = express.Router();

// Retrieve all products
router.get("/", getProducts);

// Retrieve a single product by ID
router.get("/:id", getProduct);

export default router;
