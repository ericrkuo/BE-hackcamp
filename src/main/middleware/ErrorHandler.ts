import { NextFunction, Request, Response } from 'express';
import {FrontEndErrorObject} from "../interface/FrontEndErrorObject";

/**
 * Middleware function to catch all global errors and convert them into FrontEndErrorObjects
 * */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  return res
    .status(500)
    .send(new FrontEndErrorObject(error.name, [error.message]));
}
