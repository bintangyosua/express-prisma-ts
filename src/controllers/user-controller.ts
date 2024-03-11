import { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "../models/user-model";
import { UserService } from "../services/user-service";

export class UserController {
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(200).json({ data: "Mantap lah" });
    try {
    } catch (error) {
      next(error);
    }
  }
}
