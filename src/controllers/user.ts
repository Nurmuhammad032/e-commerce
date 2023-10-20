import asyncHandler from "express-async-handler";
import Products from "../models/ProductModel";
import User from "../models/UserModel";

/**
 * Login
 * @route POST /api/users/login
 * @access Public
 **/
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
      createdAt: user.createdAt,
    });
  } else {
    res.json(401);
    throw new Error("Invalid Email or Password");
  }
});

/**
 * Register
 * @route POST /api/users/register
 * @access Public
 **/
export const register = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
