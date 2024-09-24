import { z } from "zod";

import { UserSchema, UserOnlyRequiredSchema } from "@/schemas/user";

export type UserOnlyRequired = z.infer<typeof UserOnlyRequiredSchema>;
export type User = z.infer<typeof UserSchema>;
