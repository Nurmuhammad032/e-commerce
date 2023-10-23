import { Response } from "express";

// Common function to handle errors
export const handleError = (
  res: Response,
  statusCode: number,
  message: string
) => {
  res.status(statusCode);
  throw new Error(message);
};
