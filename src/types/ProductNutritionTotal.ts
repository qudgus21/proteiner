import { z } from "zod";
import { ProductNutritionTotalSchema } from "@/schemas/productNutritionTotal";

export type ProductNutritionTotal = z.infer<typeof ProductNutritionTotalSchema>;
