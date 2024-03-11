import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import {
  CreateUserRequest,
  UserResponse,
  toUserResponse,
} from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";

export class UserService {
  public static async register(
    request: CreateUserRequest
  ): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameUsername !== 0) {
      throw new ResponseError(400, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }
}
