import { z } from "zod";
import { ProductSchema, ProductCreateSchema } from "@/schemas/product";

export type Product = z.infer<typeof ProductSchema>;
export type ProductCreate = z.infer<typeof ProductCreateSchema>;
