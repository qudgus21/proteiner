import { z } from "zod";
import { ProductSchema } from "@/schemas/product";

export type Product = z.infer<typeof ProductSchema>;
