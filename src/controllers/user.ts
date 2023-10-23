import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/UserModel";
import generateToken from "../utils/generateToken";
import { Request, Response } from "express";
import { handleError } from "../utils/handleError";

// Common function to send user data with a token
const sendUserWithToken = (res: Response, user: IUser) => {
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    token: generateToken(user._id),
  });
};

/**
 * Login
 * @route POST /api/users/login
 * @access Public
 **/
export const login = asyncHandler(async (req: Request<{}, {}, IUser>, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    sendUserWithToken(res, user);
  } else {
    handleError(res, 401, "Invalid Email or Password");
  }
});

/**
 * Register
 * @route POST /api/users/register
 * @access Public
 **/
export const register = asyncHandler(
  async (req: Request<{}, {}, IUser>, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        sendUserWithToken(res, user);
      } else {
        handleError(res, 400, "Invalid user data");
      }
    }
  }
);

/**
 * User profile
 * @route GET /api/users/profile
 * @access Private
 **/
export const userProfile = async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    });
  } else {
    handleError(res, 404, "User not found");
  }
};

/**
 * Update user profile
 * @route PUT /api/users/profile
 * @access Private
 **/
export const updateUserProfile = async (
  req: Request<{}, {}, IUser>,
  res: Response
) => {
  const user = await User.findById(req.user._id);
  const { name, email, password } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    sendUserWithToken(res, updatedUser);
  } else {
    handleError(res, 404, "User not found");
  }
};
