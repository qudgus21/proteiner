import { z } from "zod";

// ID 검증
export const idSchema = z.string().uuid("Invalid UUID format");

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
