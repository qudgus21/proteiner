import { z } from "zod";

// ID 검증
export const idSchema = z.string().uuid("Invalid UUID format");

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

// 자식 데이터가 있는 ProductType 스키마
export const ProductTypeWithChildrenSchema = ProductTypeSchema.extend({
  children: z.array(ProductTypeSchema).optional(),
});
