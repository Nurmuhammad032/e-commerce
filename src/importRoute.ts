import { Router } from "express";
import User from "./models/UserModel";
import Product from "./models/ProductModel";
import users from "./data/user";
import products from "./data/product";

const router = Router();

router.post("/user", async (req, res) => {
  await User.deleteMany();
  const importUser = await User.insertMany(users);
  res.send({ importUser });
});

router.post("/products", async (req, res) => {
  await Product.deleteMany();
  const importProduct = await Product.insertMany(products);
  res.send({ importProduct });
});

export default router;
