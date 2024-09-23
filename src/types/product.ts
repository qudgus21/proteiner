import { z } from "zod";
import { ProductSchema, ProductCreateSchema, ProductIncludeNutritionSchema, ProductUpdateSchema } from "@/schemas/product";

export type Product = z.infer<typeof ProductSchema>;
export type ProductCreate = z.infer<typeof ProductCreateSchema>;
export type ProductIncludeNutrition = z.infer<typeof ProductIncludeNutritionSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;
