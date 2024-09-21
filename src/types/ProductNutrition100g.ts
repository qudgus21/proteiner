import { z } from "zod";
import { ProductNutrition100gSchema } from "@/schemas/productNutrition100g";

export type ProductNutrition100g = z.infer<typeof ProductNutrition100gSchema>;
