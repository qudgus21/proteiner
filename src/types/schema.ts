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

// 제품 영양 정보 100g 생성
export const ProductNutrition100gCreateSchema = z
  .object({
    calories: z.number().nonnegative(),
    carbohydrates: z.number().nonnegative(),
    sugars: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
    saturatedFat: z.number().nonnegative(),
    transFat: z.number().nonnegative(),
    cholesterol: z.number().nonnegative(),
    sodium: z.number().nonnegative(),
  })
  .strict();

// 제품 영양 정보 100g 업데이트
export const ProductNutrition100gUpdateSchema = z
  .object({
    id: idSchema,
    calories: z.number().nonnegative().optional(),
    carbohydrates: z.number().nonnegative().optional(),
    sugars: z.number().nonnegative().optional(),
    protein: z.number().nonnegative().optional(),
    fat: z.number().nonnegative().optional(),
    saturatedFat: z.number().nonnegative().optional(),
    transFat: z.number().nonnegative().optional(),
    cholesterol: z.number().nonnegative().optional(),
    sodium: z.number().nonnegative().optional(),
  })
  .strict();

// 제품 영양 정보 100g 응답
export const ProductNutrition100gSchema = z
  .object({
    id: idSchema,
    calories: z.number(),
    carbohydrates: z.number(),
    sugars: z.number(),
    protein: z.number(),
    fat: z.number(),
    saturatedFat: z.number(),
    transFat: z.number(),
    cholesterol: z.number(),
    sodium: z.number(),
  })
  .strict();

// 제품 영양 정보 총합 생성
export const ProductNutritionTotalCreateSchema = z
  .object({
    calories: z.number().nonnegative(),
    carbohydrates: z.number().nonnegative(),
    sugars: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
    saturatedFat: z.number().nonnegative(),
    transFat: z.number().nonnegative(),
    cholesterol: z.number().nonnegative(),
    sodium: z.number().nonnegative(),
  })
  .strict();

// 제품 영양 정보 총합 업데이트
export const ProductNutritionTotalUpdateSchema = z
  .object({
    id: idSchema,
    calories: z.number().nonnegative().optional(),
    carbohydrates: z.number().nonnegative().optional(),
    sugars: z.number().nonnegative().optional(),
    protein: z.number().nonnegative().optional(),
    fat: z.number().nonnegative().optional(),
    saturatedFat: z.number().nonnegative().optional(),
    transFat: z.number().nonnegative().optional(),
    cholesterol: z.number().nonnegative().optional(),
    sodium: z.number().nonnegative().optional(),
  })
  .strict();

// 제품 영양 정보 총합 응답
export const ProductNutritionTotalSchema = z
  .object({
    id: idSchema,
    calories: z.number(),
    carbohydrates: z.number(),
    sugars: z.number(),
    protein: z.number(),
    fat: z.number(),
    saturatedFat: z.number(),
    transFat: z.number(),
    cholesterol: z.number(),
    sodium: z.number(),
  })
  .strict();

// 제품 타입 생성
export const ProductTypeCreateSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    parentId: idSchema.optional(),
  })
  .strict();

// 제품 타입 업데이트
export const ProductTypeUpdateSchema = z
  .object({
    id: idSchema,
    name: z.string().min(1, "Name is required").optional(),
    parentId: idSchema.optional(),
  })
  .strict();

// 제품 타입 응답
export const ProductTypeSchema = z
  .object({
    id: idSchema,
    name: z.string(),
    parentId: idSchema.optional().nullable(),
  })
  .strict();

// 제품 사이트 생성
export const ProductSiteCreateSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
  })
  .strict();

// 제품 사이트 업데이트
export const ProductSiteUpdateSchema = z
  .object({
    id: idSchema,
    name: z.string().min(1, "Name is required").optional(),
  })
  .strict();

// 제품 사이트 응답
export const ProductSiteSchema = z
  .object({
    id: idSchema,
    name: z.string(),
  })
  .strict();

// 자식 데이터가 있는 ProductType 스키마
export const ProductTypeWithChildrenSchema = ProductTypeSchema.extend({
  children: z.array(ProductTypeSchema).optional(),
});
