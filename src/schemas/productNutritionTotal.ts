import { z } from "zod";

// ID 검증
export const idSchema = z.string().uuid("Invalid UUID format");

// 제품 영양 정보 총합 생성
export const ProductNutritionTotalCreateSchema = z
  .object({
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
    calories: z.number().optional(),
    carbohydrates: z.number().optional(),
    sugars: z.number().optional(),
    protein: z.number().optional(),
    fat: z.number().optional(),
    saturatedFat: z.number().optional(),
    transFat: z.number().optional(),
    cholesterol: z.number().optional(),
    sodium: z.number().optional(),
  })
  .strict();
