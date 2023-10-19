import asyncHandler from "express-async-handler";
import Products from "../models/ProductModel";

/**
 * Get all products
 * @route GET /api/products
 * @access Public
 **/
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find();
  res.json(products);
});

/**
 * Get single products
 * @route GET /api/products/:id
 * @access Public
 **/
export const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
