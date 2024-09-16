import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ProductScalarFieldEnumSchema = z.enum(['id','name','price','pricePer100g','productUrl','affiliateUrl','imageUrl','productTypeId','siteId','nutrition100gId','nutritionTotalId','createdAt','updatedAt']);

export const ProductNutrition100gScalarFieldEnumSchema = z.enum(['id','calories','carbohydrates','sugars','protein','fat','saturatedFat','transFat','cholesterol','sodium']);

export const ProductNutritionTotalScalarFieldEnumSchema = z.enum(['id','calories','carbohydrates','sugars','protein','fat','saturatedFat','transFat','cholesterol','sodium']);

export const ProductTypeScalarFieldEnumSchema = z.enum(['id','name','parentId']);

export const ProductSiteScalarFieldEnumSchema = z.enum(['id','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePer100g: z.number().nullable(),
  productUrl: z.string(),
  affiliateUrl: z.string().nullable(),
  imageUrl: z.string().nullable(),
  productTypeId: z.string(),
  siteId: z.string(),
  nutrition100gId: z.string().nullable(),
  nutritionTotalId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// PRODUCT NUTRITION 100 G SCHEMA
/////////////////////////////////////////

export const ProductNutrition100gSchema = z.object({
  id: z.string(),
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

export type ProductNutrition100g = z.infer<typeof ProductNutrition100gSchema>

/////////////////////////////////////////
// PRODUCT NUTRITION TOTAL SCHEMA
/////////////////////////////////////////

export const ProductNutritionTotalSchema = z.object({
  id: z.string(),
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

export type ProductNutritionTotal = z.infer<typeof ProductNutritionTotalSchema>

/////////////////////////////////////////
// PRODUCT TYPE SCHEMA
/////////////////////////////////////////

export const ProductTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  parentId: z.string().nullable(),
})

export type ProductType = z.infer<typeof ProductTypeSchema>

/////////////////////////////////////////
// PRODUCT SITE SCHEMA
/////////////////////////////////////////

export const ProductSiteSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type ProductSite = z.infer<typeof ProductSiteSchema>
