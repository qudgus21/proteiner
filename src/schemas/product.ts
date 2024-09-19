import { z } from "zod";

// ID 검증
export const idSchema = z.string().uuid("Invalid UUID format");

// 제품 생성
export const ProductCreateSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    price: z.number().int().positive("Price must be a positive integer"),
    pricePer100g: z.number().int().positive().optional(),
    productUrl: z.string().url("Invalid URL format"),
    affiliateUrl: z.string().url("Invalid URL format").optional(),
    imageUrl: z.string().url("Invalid URL format").optional(),
    productTypeId: idSchema,
    siteId: idSchema,
    nutrition100gId: idSchema.optional(),
    nutritionTotalId: idSchema.optional(),
  })
  .strict();

// 제품 업데이트
export const ProductUpdateSchema = z
  .object({
    id: idSchema,
    name: z.string().min(1, "Name is required").optional(),
    price: z.number().int().positive("Price must be a positive integer").optional(),
    pricePer100g: z.number().int().positive().optional(),
    productUrl: z.string().url("Invalid URL format").optional(),
    affiliateUrl: z.string().url("Invalid URL format").optional(),
    imageUrl: z.string().url("Invalid URL format").optional(),
    productTypeId: idSchema.optional(),
    siteId: idSchema.optional(),
    nutrition100gId: idSchema.optional(),
    nutritionTotalId: idSchema.optional(),
  })
  .strict();

// 제품 응답
export const ProductSchema = z
  .object({
    id: idSchema,
    name: z.string(),
    price: z.number(),
    pricePer100g: z.number().optional(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional(),
    imageUrl: z.string().optional(),
    productTypeId: idSchema,
    siteId: idSchema,
    nutrition100gId: idSchema.optional(),
    nutritionTotalId: idSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();
