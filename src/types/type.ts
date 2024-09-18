import { z } from "zod";

import { ProductSiteSchema, ProductTypeSchema, ProductTypeWithChildrenSchema } from "./schema";

export type ProductSite = z.infer<typeof ProductSiteSchema>;
export type ProductType = z.infer<typeof ProductTypeSchema>;
export type ProductTypeWithChildren = z.infer<typeof ProductTypeWithChildrenSchema>;
