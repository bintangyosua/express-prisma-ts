import { z, ZodType } from "zod";

export class UserValidation {
  public static readonly REGISTER: ZodType = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().max(100),
    password: z.string().min(1).max(100),
  });
}
