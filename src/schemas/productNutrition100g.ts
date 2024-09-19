import { z } from "zod";

// ID 검증
export const idSchema = z.string().uuid("Invalid UUID format");

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
