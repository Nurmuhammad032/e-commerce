import { Request, Response } from "express";

export default interface IRequest extends Request {
  user: object;
}
