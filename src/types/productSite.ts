import { z } from "zod";
import { ProductSiteSchema } from "@/schemas/productSite";

export type ProductSite = z.infer<typeof ProductSiteSchema>;
