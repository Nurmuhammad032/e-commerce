import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/UserModel";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SEC!);
        req.user = await User.findById((decoded as JwtPayload).id).select(
          "-password"
        );
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("No authorized, token failed!");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("No authorized, no token!");
    }
  }
);

export default protect;
