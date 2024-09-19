import { z } from "zod";
import { ProductTypeSchema, ProductTypeWithChildrenSchema, ProductTypeWithOptionalChildrenSchema } from "@/schemas/productType";

export type ProductType = z.infer<typeof ProductTypeSchema>;
export type ProductTypeWithChildren = z.infer<typeof ProductTypeWithChildrenSchema>;
export type ProductTypeWithOptionalChildren = z.infer<typeof ProductTypeWithOptionalChildrenSchema>;
