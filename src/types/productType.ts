import { z } from "zod";
import { ProductTypeSchema, ProductTypeWithChildrenSchema } from "@/schemas/productType";

export type ProductType = z.infer<typeof ProductTypeSchema>;
export type ProductTypeWithChildren = z.infer<typeof ProductTypeWithChildrenSchema>;
