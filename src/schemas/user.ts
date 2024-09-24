import { z } from "zod";

const idSchema = z.string().uuid("Invalid UUID format");

const RoleEnum = z.enum(["USER", "ADMIN"]);

export const UserSchema = z
  .object({
    id: idSchema,
    firebaseUid: z.string().uuid().nullable().optional(),
    role: RoleEnum.default("USER"),
    email: z.string().email("Invalid email format"),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export const UserOnlyRequiredSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })
  .strict();
