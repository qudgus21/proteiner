import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(["ReadUncommitted", "ReadCommitted", "RepeatableRead", "Serializable"]);

export const ProductScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "price",
  "pricePer100g",
  "productUrl",
  "affiliateUrl",
  "imageUrl",
  "productTypeId",
  "siteId",
  "nutrition100gId",
  "nutritionTotalId",
  "createdAt",
  "updatedAt",
]);

export const ProductNutrition100gScalarFieldEnumSchema = z.enum([
  "id",
  "calories",
  "carbohydrates",
  "sugars",
  "protein",
  "fat",
  "saturatedFat",
  "transFat",
  "cholesterol",
  "sodium",
]);

export const ProductNutritionTotalScalarFieldEnumSchema = z.enum([
  "id",
  "calories",
  "carbohydrates",
  "sugars",
  "protein",
  "fat",
  "saturatedFat",
  "transFat",
  "cholesterol",
  "sodium",
]);

export const ProductTypeScalarFieldEnumSchema = z.enum(["id", "name", "parentId"]);

export const ProductSiteScalarFieldEnumSchema = z.enum(["id", "name"]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().int(),
  pricePer100g: z.number().int().nullable(),
  productUrl: z.string(),
  affiliateUrl: z.string().nullable(),
  imageUrl: z.string().nullable(),
  productTypeId: z.string(),
  siteId: z.string(),
  nutrition100gId: z.string().nullable(),
  nutritionTotalId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Product = z.infer<typeof ProductSchema>;

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
});

export type ProductNutrition100g = z.infer<typeof ProductNutrition100gSchema>;

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
});

export type ProductNutritionTotal = z.infer<typeof ProductNutritionTotalSchema>;

/////////////////////////////////////////
// PRODUCT TYPE SCHEMA
/////////////////////////////////////////

export const ProductTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  parentId: z.string().nullable(),
});

export type ProductType = z.infer<typeof ProductTypeSchema>;

/////////////////////////////////////////
// PRODUCT SITE SCHEMA
/////////////////////////////////////////

export const ProductSiteSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type ProductSite = z.infer<typeof ProductSiteSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z
  .object({
    productType: z.union([z.boolean(), z.lazy(() => ProductTypeArgsSchema)]).optional(),
    site: z.union([z.boolean(), z.lazy(() => ProductSiteArgsSchema)]).optional(),
    nutrition100g: z.union([z.boolean(), z.lazy(() => ProductNutrition100gArgsSchema)]).optional(),
    nutritionTotal: z.union([z.boolean(), z.lazy(() => ProductNutritionTotalArgsSchema)]).optional(),
  })
  .strict();

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductSelectSchema).optional(),
    include: z.lazy(() => ProductIncludeSchema).optional(),
  })
  .strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    price: z.boolean().optional(),
    pricePer100g: z.boolean().optional(),
    productUrl: z.boolean().optional(),
    affiliateUrl: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    productTypeId: z.boolean().optional(),
    siteId: z.boolean().optional(),
    nutrition100gId: z.boolean().optional(),
    nutritionTotalId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    productType: z.union([z.boolean(), z.lazy(() => ProductTypeArgsSchema)]).optional(),
    site: z.union([z.boolean(), z.lazy(() => ProductSiteArgsSchema)]).optional(),
    nutrition100g: z.union([z.boolean(), z.lazy(() => ProductNutrition100gArgsSchema)]).optional(),
    nutritionTotal: z.union([z.boolean(), z.lazy(() => ProductNutritionTotalArgsSchema)]).optional(),
  })
  .strict();

// PRODUCT NUTRITION 100 G
//------------------------------------------------------

export const ProductNutrition100gIncludeSchema: z.ZodType<Prisma.ProductNutrition100gInclude> = z
  .object({
    product: z.union([z.boolean(), z.lazy(() => ProductArgsSchema)]).optional(),
  })
  .strict();

export const ProductNutrition100gArgsSchema: z.ZodType<Prisma.ProductNutrition100gDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductNutrition100gSelectSchema).optional(),
    include: z.lazy(() => ProductNutrition100gIncludeSchema).optional(),
  })
  .strict();

export const ProductNutrition100gSelectSchema: z.ZodType<Prisma.ProductNutrition100gSelect> = z
  .object({
    id: z.boolean().optional(),
    calories: z.boolean().optional(),
    carbohydrates: z.boolean().optional(),
    sugars: z.boolean().optional(),
    protein: z.boolean().optional(),
    fat: z.boolean().optional(),
    saturatedFat: z.boolean().optional(),
    transFat: z.boolean().optional(),
    cholesterol: z.boolean().optional(),
    sodium: z.boolean().optional(),
    product: z.union([z.boolean(), z.lazy(() => ProductArgsSchema)]).optional(),
  })
  .strict();

// PRODUCT NUTRITION TOTAL
//------------------------------------------------------

export const ProductNutritionTotalIncludeSchema: z.ZodType<Prisma.ProductNutritionTotalInclude> = z
  .object({
    product: z.union([z.boolean(), z.lazy(() => ProductArgsSchema)]).optional(),
  })
  .strict();

export const ProductNutritionTotalArgsSchema: z.ZodType<Prisma.ProductNutritionTotalDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductNutritionTotalSelectSchema).optional(),
    include: z.lazy(() => ProductNutritionTotalIncludeSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalSelectSchema: z.ZodType<Prisma.ProductNutritionTotalSelect> = z
  .object({
    id: z.boolean().optional(),
    calories: z.boolean().optional(),
    carbohydrates: z.boolean().optional(),
    sugars: z.boolean().optional(),
    protein: z.boolean().optional(),
    fat: z.boolean().optional(),
    saturatedFat: z.boolean().optional(),
    transFat: z.boolean().optional(),
    cholesterol: z.boolean().optional(),
    sodium: z.boolean().optional(),
    product: z.union([z.boolean(), z.lazy(() => ProductArgsSchema)]).optional(),
  })
  .strict();

// PRODUCT TYPE
//------------------------------------------------------

export const ProductTypeIncludeSchema: z.ZodType<Prisma.ProductTypeInclude> = z
  .object({
    parent: z.union([z.boolean(), z.lazy(() => ProductTypeArgsSchema)]).optional(),
    children: z.union([z.boolean(), z.lazy(() => ProductTypeFindManyArgsSchema)]).optional(),
    products: z.union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => ProductTypeCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const ProductTypeArgsSchema: z.ZodType<Prisma.ProductTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductTypeSelectSchema).optional(),
    include: z.lazy(() => ProductTypeIncludeSchema).optional(),
  })
  .strict();

export const ProductTypeCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductTypeCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductTypeCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const ProductTypeCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductTypeCountOutputTypeSelect> = z
  .object({
    children: z.boolean().optional(),
    products: z.boolean().optional(),
  })
  .strict();

export const ProductTypeSelectSchema: z.ZodType<Prisma.ProductTypeSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    parentId: z.boolean().optional(),
    parent: z.union([z.boolean(), z.lazy(() => ProductTypeArgsSchema)]).optional(),
    children: z.union([z.boolean(), z.lazy(() => ProductTypeFindManyArgsSchema)]).optional(),
    products: z.union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => ProductTypeCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

// PRODUCT SITE
//------------------------------------------------------

export const ProductSiteIncludeSchema: z.ZodType<Prisma.ProductSiteInclude> = z
  .object({
    products: z.union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => ProductSiteCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

export const ProductSiteArgsSchema: z.ZodType<Prisma.ProductSiteDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductSiteSelectSchema).optional(),
    include: z.lazy(() => ProductSiteIncludeSchema).optional(),
  })
  .strict();

export const ProductSiteCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductSiteCountOutputTypeDefaultArgs> = z
  .object({
    select: z.lazy(() => ProductSiteCountOutputTypeSelectSchema).nullish(),
  })
  .strict();

export const ProductSiteCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductSiteCountOutputTypeSelect> = z
  .object({
    products: z.boolean().optional(),
  })
  .strict();

export const ProductSiteSelectSchema: z.ZodType<Prisma.ProductSiteSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    products: z.union([z.boolean(), z.lazy(() => ProductFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => ProductSiteCountOutputTypeArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => ProductWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    price: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    pricePer100g: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    productUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    affiliateUrl: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    productTypeId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    siteId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    nutrition100gId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    productType: z.union([z.lazy(() => ProductTypeRelationFilterSchema), z.lazy(() => ProductTypeWhereInputSchema)]).optional(),
    site: z.union([z.lazy(() => ProductSiteRelationFilterSchema), z.lazy(() => ProductSiteWhereInputSchema)]).optional(),
    nutrition100g: z
      .union([z.lazy(() => ProductNutrition100gNullableRelationFilterSchema), z.lazy(() => ProductNutrition100gWhereInputSchema)])
      .optional()
      .nullable(),
    nutritionTotal: z
      .union([z.lazy(() => ProductNutritionTotalNullableRelationFilterSchema), z.lazy(() => ProductNutritionTotalWhereInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    price: z.lazy(() => SortOrderSchema).optional(),
    pricePer100g: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productUrl: z.lazy(() => SortOrderSchema).optional(),
    affiliateUrl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imageUrl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productTypeId: z.lazy(() => SortOrderSchema).optional(),
    siteId: z.lazy(() => SortOrderSchema).optional(),
    nutrition100gId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    nutritionTotalId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    productType: z.lazy(() => ProductTypeOrderByWithRelationInputSchema).optional(),
    site: z.lazy(() => ProductSiteOrderByWithRelationInputSchema).optional(),
    nutrition100g: z.lazy(() => ProductNutrition100gOrderByWithRelationInputSchema).optional(),
    nutritionTotal: z.lazy(() => ProductNutritionTotalOrderByWithRelationInputSchema).optional(),
  })
  .strict();

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z
  .union([
    z.object({
      id: z.string(),
      nutrition100gId: z.string(),
      nutritionTotalId: z.string(),
    }),
    z.object({
      id: z.string(),
      nutrition100gId: z.string(),
    }),
    z.object({
      id: z.string(),
      nutritionTotalId: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
    z.object({
      nutrition100gId: z.string(),
      nutritionTotalId: z.string(),
    }),
    z.object({
      nutrition100gId: z.string(),
    }),
    z.object({
      nutritionTotalId: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.string().optional(),
        nutrition100gId: z.string().optional(),
        nutritionTotalId: z.string().optional(),
        AND: z.union([z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => ProductWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => ProductWhereInputSchema), z.lazy(() => ProductWhereInputSchema).array()]).optional(),
        name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        price: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        pricePer100g: z
          .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
          .optional()
          .nullable(),
        productUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        affiliateUrl: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        imageUrl: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        productTypeId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        siteId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
        productType: z.union([z.lazy(() => ProductTypeRelationFilterSchema), z.lazy(() => ProductTypeWhereInputSchema)]).optional(),
        site: z.union([z.lazy(() => ProductSiteRelationFilterSchema), z.lazy(() => ProductSiteWhereInputSchema)]).optional(),
        nutrition100g: z
          .union([z.lazy(() => ProductNutrition100gNullableRelationFilterSchema), z.lazy(() => ProductNutrition100gWhereInputSchema)])
          .optional()
          .nullable(),
        nutritionTotal: z
          .union([z.lazy(() => ProductNutritionTotalNullableRelationFilterSchema), z.lazy(() => ProductNutritionTotalWhereInputSchema)])
          .optional()
          .nullable(),
      })
      .strict()
  );

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    price: z.lazy(() => SortOrderSchema).optional(),
    pricePer100g: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productUrl: z.lazy(() => SortOrderSchema).optional(),
    affiliateUrl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    imageUrl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    productTypeId: z.lazy(() => SortOrderSchema).optional(),
    siteId: z.lazy(() => SortOrderSchema).optional(),
    nutrition100gId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    nutritionTotalId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => ProductAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => ProductSumOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([z.lazy(() => ProductScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => ProductScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => ProductScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    price: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    pricePer100g: z
      .union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
      .optional()
      .nullable(),
    productUrl: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    affiliateUrl: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    productTypeId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    siteId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    nutrition100gId: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
  })
  .strict();

export const ProductNutrition100gWhereInputSchema: z.ZodType<Prisma.ProductNutrition100gWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => ProductNutrition100gWhereInputSchema), z.lazy(() => ProductNutrition100gWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => ProductNutrition100gWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => ProductNutrition100gWhereInputSchema), z.lazy(() => ProductNutrition100gWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    calories: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    carbohydrates: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    sugars: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    protein: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    fat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    saturatedFat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    transFat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    cholesterol: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    sodium: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    product: z
      .union([z.lazy(() => ProductNullableRelationFilterSchema), z.lazy(() => ProductWhereInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const ProductNutrition100gOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductNutrition100gOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
    product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gWhereUniqueInputSchema: z.ZodType<Prisma.ProductNutrition100gWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z
      .object({
        id: z.string().optional(),
        AND: z.union([z.lazy(() => ProductNutrition100gWhereInputSchema), z.lazy(() => ProductNutrition100gWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => ProductNutrition100gWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => ProductNutrition100gWhereInputSchema), z.lazy(() => ProductNutrition100gWhereInputSchema).array()]).optional(),
        calories: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        carbohydrates: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        sugars: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        protein: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        fat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        saturatedFat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        transFat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        cholesterol: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        sodium: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        product: z
          .union([z.lazy(() => ProductNullableRelationFilterSchema), z.lazy(() => ProductWhereInputSchema)])
          .optional()
          .nullable(),
      })
      .strict()
  );

export const ProductNutrition100gOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductNutrition100gOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ProductNutrition100gCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => ProductNutrition100gAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ProductNutrition100gMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ProductNutrition100gMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => ProductNutrition100gSumOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductNutrition100gScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProductNutrition100gScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ProductNutrition100gScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProductNutrition100gScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProductNutrition100gScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ProductNutrition100gScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    calories: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    carbohydrates: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    sugars: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    protein: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    fat: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    saturatedFat: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    transFat: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    cholesterol: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    sodium: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  })
  .strict();

export const ProductNutritionTotalWhereInputSchema: z.ZodType<Prisma.ProductNutritionTotalWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => ProductNutritionTotalWhereInputSchema), z.lazy(() => ProductNutritionTotalWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => ProductNutritionTotalWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => ProductNutritionTotalWhereInputSchema), z.lazy(() => ProductNutritionTotalWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    calories: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    carbohydrates: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    sugars: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    protein: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    fat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    saturatedFat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    transFat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    cholesterol: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    sodium: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
    product: z
      .union([z.lazy(() => ProductNullableRelationFilterSchema), z.lazy(() => ProductWhereInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const ProductNutritionTotalOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductNutritionTotalOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
    product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalWhereUniqueInputSchema: z.ZodType<Prisma.ProductNutritionTotalWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z
      .object({
        id: z.string().optional(),
        AND: z.union([z.lazy(() => ProductNutritionTotalWhereInputSchema), z.lazy(() => ProductNutritionTotalWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => ProductNutritionTotalWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => ProductNutritionTotalWhereInputSchema), z.lazy(() => ProductNutritionTotalWhereInputSchema).array()]).optional(),
        calories: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        carbohydrates: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        sugars: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        protein: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        fat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        saturatedFat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        transFat: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        cholesterol: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        sodium: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
        product: z
          .union([z.lazy(() => ProductNullableRelationFilterSchema), z.lazy(() => ProductWhereInputSchema)])
          .optional()
          .nullable(),
      })
      .strict()
  );

export const ProductNutritionTotalOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductNutritionTotalOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ProductNutritionTotalCountOrderByAggregateInputSchema).optional(),
    _avg: z.lazy(() => ProductNutritionTotalAvgOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ProductNutritionTotalMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ProductNutritionTotalMinOrderByAggregateInputSchema).optional(),
    _sum: z.lazy(() => ProductNutritionTotalSumOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductNutritionTotalScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ProductNutritionTotalScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ProductNutritionTotalScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ProductNutritionTotalScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ProductNutritionTotalScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ProductNutritionTotalScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    calories: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    carbohydrates: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    sugars: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    protein: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    fat: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    saturatedFat: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    transFat: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    cholesterol: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
    sodium: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
  })
  .strict();

export const ProductTypeWhereInputSchema: z.ZodType<Prisma.ProductTypeWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => ProductTypeWhereInputSchema), z.lazy(() => ProductTypeWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => ProductTypeWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => ProductTypeWhereInputSchema), z.lazy(() => ProductTypeWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    parentId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    parent: z
      .union([z.lazy(() => ProductTypeNullableRelationFilterSchema), z.lazy(() => ProductTypeWhereInputSchema)])
      .optional()
      .nullable(),
    children: z.lazy(() => ProductTypeListRelationFilterSchema).optional(),
    products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  })
  .strict();

export const ProductTypeOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductTypeOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    parent: z.lazy(() => ProductTypeOrderByWithRelationInputSchema).optional(),
    children: z.lazy(() => ProductTypeOrderByRelationAggregateInputSchema).optional(),
    products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  })
  .strict();

export const ProductTypeWhereUniqueInputSchema: z.ZodType<Prisma.ProductTypeWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z
      .object({
        id: z.string().optional(),
        AND: z.union([z.lazy(() => ProductTypeWhereInputSchema), z.lazy(() => ProductTypeWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => ProductTypeWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => ProductTypeWhereInputSchema), z.lazy(() => ProductTypeWhereInputSchema).array()]).optional(),
        name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        parentId: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        parent: z
          .union([z.lazy(() => ProductTypeNullableRelationFilterSchema), z.lazy(() => ProductTypeWhereInputSchema)])
          .optional()
          .nullable(),
        children: z.lazy(() => ProductTypeListRelationFilterSchema).optional(),
        products: z.lazy(() => ProductListRelationFilterSchema).optional(),
      })
      .strict()
  );

export const ProductTypeOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductTypeOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => ProductTypeCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ProductTypeMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ProductTypeMinOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const ProductTypeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductTypeScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([z.lazy(() => ProductTypeScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductTypeScalarWhereWithAggregatesInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => ProductTypeScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => ProductTypeScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductTypeScalarWhereWithAggregatesInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    parentId: z
      .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const ProductSiteWhereInputSchema: z.ZodType<Prisma.ProductSiteWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => ProductSiteWhereInputSchema), z.lazy(() => ProductSiteWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => ProductSiteWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => ProductSiteWhereInputSchema), z.lazy(() => ProductSiteWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  })
  .strict();

export const ProductSiteOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductSiteOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  })
  .strict();

export const ProductSiteWhereUniqueInputSchema: z.ZodType<Prisma.ProductSiteWhereUniqueInput> = z
  .union([
    z.object({
      id: z.string(),
      name: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
    z.object({
      name: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.string().optional(),
        name: z.string().optional(),
        AND: z.union([z.lazy(() => ProductSiteWhereInputSchema), z.lazy(() => ProductSiteWhereInputSchema).array()]).optional(),
        OR: z
          .lazy(() => ProductSiteWhereInputSchema)
          .array()
          .optional(),
        NOT: z.union([z.lazy(() => ProductSiteWhereInputSchema), z.lazy(() => ProductSiteWhereInputSchema).array()]).optional(),
        products: z.lazy(() => ProductListRelationFilterSchema).optional(),
      })
      .strict()
  );

export const ProductSiteOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductSiteOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ProductSiteCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ProductSiteMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ProductSiteMinOrderByAggregateInputSchema).optional(),
  })
  .strict();

export const ProductSiteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductSiteScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([z.lazy(() => ProductSiteScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductSiteScalarWhereWithAggregatesInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => ProductSiteScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => ProductSiteScalarWhereWithAggregatesInputSchema), z.lazy(() => ProductSiteScalarWhereWithAggregatesInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  })
  .strict();

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    productType: z.lazy(() => ProductTypeCreateNestedOneWithoutProductsInputSchema),
    site: z.lazy(() => ProductSiteCreateNestedOneWithoutProductsInputSchema),
    nutrition100g: z.lazy(() => ProductNutrition100gCreateNestedOneWithoutProductInputSchema).optional(),
    nutritionTotal: z.lazy(() => ProductNutritionTotalCreateNestedOneWithoutProductInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    productTypeId: z.string(),
    siteId: z.string(),
    nutrition100gId: z.string().optional().nullable(),
    nutritionTotalId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    productType: z.lazy(() => ProductTypeUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
    site: z.lazy(() => ProductSiteUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
    nutrition100g: z.lazy(() => ProductNutrition100gUpdateOneWithoutProductNestedInputSchema).optional(),
    nutritionTotal: z.lazy(() => ProductNutritionTotalUpdateOneWithoutProductNestedInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productTypeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    siteId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    nutrition100gId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    productTypeId: z.string(),
    siteId: z.string(),
    nutrition100gId: z.string().optional().nullable(),
    nutritionTotalId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productTypeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    siteId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    nutrition100gId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductNutrition100gCreateInputSchema: z.ZodType<Prisma.ProductNutrition100gCreateInput> = z
  .object({
    id: z.string().optional(),
    calories: z.number(),
    carbohydrates: z.number(),
    sugars: z.number(),
    protein: z.number(),
    fat: z.number(),
    saturatedFat: z.number(),
    transFat: z.number(),
    cholesterol: z.number(),
    sodium: z.number(),
    product: z.lazy(() => ProductCreateNestedOneWithoutNutrition100gInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gUncheckedCreateInputSchema: z.ZodType<Prisma.ProductNutrition100gUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    calories: z.number(),
    carbohydrates: z.number(),
    sugars: z.number(),
    protein: z.number(),
    fat: z.number(),
    saturatedFat: z.number(),
    transFat: z.number(),
    cholesterol: z.number(),
    sodium: z.number(),
    product: z.lazy(() => ProductUncheckedCreateNestedOneWithoutNutrition100gInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gUpdateInputSchema: z.ZodType<Prisma.ProductNutrition100gUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    product: z.lazy(() => ProductUpdateOneWithoutNutrition100gNestedInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductNutrition100gUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    product: z.lazy(() => ProductUncheckedUpdateOneWithoutNutrition100gNestedInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gCreateManyInputSchema: z.ZodType<Prisma.ProductNutrition100gCreateManyInput> = z
  .object({
    id: z.string().optional(),
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

export const ProductNutrition100gUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductNutrition100gUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductNutrition100gUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductNutrition100gUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductNutritionTotalCreateInputSchema: z.ZodType<Prisma.ProductNutritionTotalCreateInput> = z
  .object({
    id: z.string().optional(),
    calories: z.number(),
    carbohydrates: z.number(),
    sugars: z.number(),
    protein: z.number(),
    fat: z.number(),
    saturatedFat: z.number(),
    transFat: z.number(),
    cholesterol: z.number(),
    sodium: z.number(),
    product: z.lazy(() => ProductCreateNestedOneWithoutNutritionTotalInputSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalUncheckedCreateInputSchema: z.ZodType<Prisma.ProductNutritionTotalUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    calories: z.number(),
    carbohydrates: z.number(),
    sugars: z.number(),
    protein: z.number(),
    fat: z.number(),
    saturatedFat: z.number(),
    transFat: z.number(),
    cholesterol: z.number(),
    sodium: z.number(),
    product: z.lazy(() => ProductUncheckedCreateNestedOneWithoutNutritionTotalInputSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalUpdateInputSchema: z.ZodType<Prisma.ProductNutritionTotalUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    product: z.lazy(() => ProductUpdateOneWithoutNutritionTotalNestedInputSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductNutritionTotalUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    product: z.lazy(() => ProductUncheckedUpdateOneWithoutNutritionTotalNestedInputSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalCreateManyInputSchema: z.ZodType<Prisma.ProductNutritionTotalCreateManyInput> = z
  .object({
    id: z.string().optional(),
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

export const ProductNutritionTotalUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductNutritionTotalUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductNutritionTotalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductNutritionTotalUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductTypeCreateInputSchema: z.ZodType<Prisma.ProductTypeCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    parent: z.lazy(() => ProductTypeCreateNestedOneWithoutChildrenInputSchema).optional(),
    children: z.lazy(() => ProductTypeCreateNestedManyWithoutParentInputSchema).optional(),
    products: z.lazy(() => ProductCreateNestedManyWithoutProductTypeInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedCreateInputSchema: z.ZodType<Prisma.ProductTypeUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    parentId: z.string().optional().nullable(),
    children: z.lazy(() => ProductTypeUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
    products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutProductTypeInputSchema).optional(),
  })
  .strict();

export const ProductTypeUpdateInputSchema: z.ZodType<Prisma.ProductTypeUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    parent: z.lazy(() => ProductTypeUpdateOneWithoutChildrenNestedInputSchema).optional(),
    children: z.lazy(() => ProductTypeUpdateManyWithoutParentNestedInputSchema).optional(),
    products: z.lazy(() => ProductUpdateManyWithoutProductTypeNestedInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductTypeUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    parentId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    children: z.lazy(() => ProductTypeUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
    products: z.lazy(() => ProductUncheckedUpdateManyWithoutProductTypeNestedInputSchema).optional(),
  })
  .strict();

export const ProductTypeCreateManyInputSchema: z.ZodType<Prisma.ProductTypeCreateManyInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    parentId: z.string().optional().nullable(),
  })
  .strict();

export const ProductTypeUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductTypeUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductTypeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductTypeUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    parentId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const ProductSiteCreateInputSchema: z.ZodType<Prisma.ProductSiteCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    products: z.lazy(() => ProductCreateNestedManyWithoutSiteInputSchema).optional(),
  })
  .strict();

export const ProductSiteUncheckedCreateInputSchema: z.ZodType<Prisma.ProductSiteUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutSiteInputSchema).optional(),
  })
  .strict();

export const ProductSiteUpdateInputSchema: z.ZodType<Prisma.ProductSiteUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    products: z.lazy(() => ProductUpdateManyWithoutSiteNestedInputSchema).optional(),
  })
  .strict();

export const ProductSiteUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductSiteUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    products: z.lazy(() => ProductUncheckedUpdateManyWithoutSiteNestedInputSchema).optional(),
  })
  .strict();

export const ProductSiteCreateManyInputSchema: z.ZodType<Prisma.ProductSiteCreateManyInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
  })
  .strict();

export const ProductSiteUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductSiteUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductSiteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductSiteUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
  })
  .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
  })
  .strict();

export const ProductTypeRelationFilterSchema: z.ZodType<Prisma.ProductTypeRelationFilter> = z
  .object({
    is: z.lazy(() => ProductTypeWhereInputSchema).optional(),
    isNot: z.lazy(() => ProductTypeWhereInputSchema).optional(),
  })
  .strict();

export const ProductSiteRelationFilterSchema: z.ZodType<Prisma.ProductSiteRelationFilter> = z
  .object({
    is: z.lazy(() => ProductSiteWhereInputSchema).optional(),
    isNot: z.lazy(() => ProductSiteWhereInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gNullableRelationFilterSchema: z.ZodType<Prisma.ProductNutrition100gNullableRelationFilter> = z
  .object({
    is: z
      .lazy(() => ProductNutrition100gWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ProductNutrition100gWhereInputSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ProductNutritionTotalNullableRelationFilterSchema: z.ZodType<Prisma.ProductNutritionTotalNullableRelationFilter> = z
  .object({
    is: z
      .lazy(() => ProductNutritionTotalWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ProductNutritionTotalWhereInputSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    price: z.lazy(() => SortOrderSchema).optional(),
    pricePer100g: z.lazy(() => SortOrderSchema).optional(),
    productUrl: z.lazy(() => SortOrderSchema).optional(),
    affiliateUrl: z.lazy(() => SortOrderSchema).optional(),
    imageUrl: z.lazy(() => SortOrderSchema).optional(),
    productTypeId: z.lazy(() => SortOrderSchema).optional(),
    siteId: z.lazy(() => SortOrderSchema).optional(),
    nutrition100gId: z.lazy(() => SortOrderSchema).optional(),
    nutritionTotalId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> = z
  .object({
    price: z.lazy(() => SortOrderSchema).optional(),
    pricePer100g: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    price: z.lazy(() => SortOrderSchema).optional(),
    pricePer100g: z.lazy(() => SortOrderSchema).optional(),
    productUrl: z.lazy(() => SortOrderSchema).optional(),
    affiliateUrl: z.lazy(() => SortOrderSchema).optional(),
    imageUrl: z.lazy(() => SortOrderSchema).optional(),
    productTypeId: z.lazy(() => SortOrderSchema).optional(),
    siteId: z.lazy(() => SortOrderSchema).optional(),
    nutrition100gId: z.lazy(() => SortOrderSchema).optional(),
    nutritionTotalId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    price: z.lazy(() => SortOrderSchema).optional(),
    pricePer100g: z.lazy(() => SortOrderSchema).optional(),
    productUrl: z.lazy(() => SortOrderSchema).optional(),
    affiliateUrl: z.lazy(() => SortOrderSchema).optional(),
    imageUrl: z.lazy(() => SortOrderSchema).optional(),
    productTypeId: z.lazy(() => SortOrderSchema).optional(),
    siteId: z.lazy(() => SortOrderSchema).optional(),
    nutrition100gId: z.lazy(() => SortOrderSchema).optional(),
    nutritionTotalId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput> = z
  .object({
    price: z.lazy(() => SortOrderSchema).optional(),
    pricePer100g: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })
  .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  })
  .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  })
  .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  })
  .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })
  .strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
  })
  .strict();

export const ProductNullableRelationFilterSchema: z.ZodType<Prisma.ProductNullableRelationFilter> = z
  .object({
    is: z
      .lazy(() => ProductWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ProductWhereInputSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ProductNutrition100gCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutrition100gCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductNutrition100gAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutrition100gAvgOrderByAggregateInput> = z
  .object({
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductNutrition100gMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutrition100gMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductNutrition100gMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutrition100gMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductNutrition100gSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutrition100gSumOrderByAggregateInput> = z
  .object({
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
    _min: z.lazy(() => NestedFloatFilterSchema).optional(),
    _max: z.lazy(() => NestedFloatFilterSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutritionTotalCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutritionTotalAvgOrderByAggregateInput> = z
  .object({
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutritionTotalMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutritionTotalMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductNutritionTotalSumOrderByAggregateInput> = z
  .object({
    calories: z.lazy(() => SortOrderSchema).optional(),
    carbohydrates: z.lazy(() => SortOrderSchema).optional(),
    sugars: z.lazy(() => SortOrderSchema).optional(),
    protein: z.lazy(() => SortOrderSchema).optional(),
    fat: z.lazy(() => SortOrderSchema).optional(),
    saturatedFat: z.lazy(() => SortOrderSchema).optional(),
    transFat: z.lazy(() => SortOrderSchema).optional(),
    cholesterol: z.lazy(() => SortOrderSchema).optional(),
    sodium: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductTypeNullableRelationFilterSchema: z.ZodType<Prisma.ProductTypeNullableRelationFilter> = z
  .object({
    is: z
      .lazy(() => ProductTypeWhereInputSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => ProductTypeWhereInputSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const ProductTypeListRelationFilterSchema: z.ZodType<Prisma.ProductTypeListRelationFilter> = z
  .object({
    every: z.lazy(() => ProductTypeWhereInputSchema).optional(),
    some: z.lazy(() => ProductTypeWhereInputSchema).optional(),
    none: z.lazy(() => ProductTypeWhereInputSchema).optional(),
  })
  .strict();

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> = z
  .object({
    every: z.lazy(() => ProductWhereInputSchema).optional(),
    some: z.lazy(() => ProductWhereInputSchema).optional(),
    none: z.lazy(() => ProductWhereInputSchema).optional(),
  })
  .strict();

export const ProductTypeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductTypeOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> = z
  .object({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductTypeCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductTypeCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductTypeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductTypeMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductTypeMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductTypeMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    parentId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductSiteCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSiteCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductSiteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSiteMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductSiteMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSiteMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ProductTypeCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.ProductTypeCreateNestedOneWithoutProductsInput> = z
  .object({
    create: z
      .union([z.lazy(() => ProductTypeCreateWithoutProductsInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutProductsInputSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => ProductTypeCreateOrConnectWithoutProductsInputSchema).optional(),
    connect: z.lazy(() => ProductTypeWhereUniqueInputSchema).optional(),
  })
  .strict();

export const ProductSiteCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.ProductSiteCreateNestedOneWithoutProductsInput> = z
  .object({
    create: z
      .union([z.lazy(() => ProductSiteCreateWithoutProductsInputSchema), z.lazy(() => ProductSiteUncheckedCreateWithoutProductsInputSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => ProductSiteCreateOrConnectWithoutProductsInputSchema).optional(),
    connect: z.lazy(() => ProductSiteWhereUniqueInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.ProductNutrition100gCreateNestedOneWithoutProductInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductNutrition100gCreateWithoutProductInputSchema),
          z.lazy(() => ProductNutrition100gUncheckedCreateWithoutProductInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => ProductNutrition100gCreateOrConnectWithoutProductInputSchema).optional(),
      connect: z.lazy(() => ProductNutrition100gWhereUniqueInputSchema).optional(),
    })
    .strict();

export const ProductNutritionTotalCreateNestedOneWithoutProductInputSchema: z.ZodType<Prisma.ProductNutritionTotalCreateNestedOneWithoutProductInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductNutritionTotalCreateWithoutProductInputSchema),
          z.lazy(() => ProductNutritionTotalUncheckedCreateWithoutProductInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => ProductNutritionTotalCreateOrConnectWithoutProductInputSchema).optional(),
      connect: z.lazy(() => ProductNutritionTotalWhereUniqueInputSchema).optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z
  .object({
    set: z.string().optional(),
  })
  .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z
  .object({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  })
  .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z
  .object({
    set: z.number().optional().nullable(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  })
  .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z
  .object({
    set: z.string().optional().nullable(),
  })
  .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z
  .object({
    set: z.coerce.date().optional(),
  })
  .strict();

export const ProductTypeUpdateOneRequiredWithoutProductsNestedInputSchema: z.ZodType<Prisma.ProductTypeUpdateOneRequiredWithoutProductsNestedInput> =
  z
    .object({
      create: z
        .union([z.lazy(() => ProductTypeCreateWithoutProductsInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutProductsInputSchema)])
        .optional(),
      connectOrCreate: z.lazy(() => ProductTypeCreateOrConnectWithoutProductsInputSchema).optional(),
      upsert: z.lazy(() => ProductTypeUpsertWithoutProductsInputSchema).optional(),
      connect: z.lazy(() => ProductTypeWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProductTypeUpdateToOneWithWhereWithoutProductsInputSchema),
          z.lazy(() => ProductTypeUpdateWithoutProductsInputSchema),
          z.lazy(() => ProductTypeUncheckedUpdateWithoutProductsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductSiteUpdateOneRequiredWithoutProductsNestedInputSchema: z.ZodType<Prisma.ProductSiteUpdateOneRequiredWithoutProductsNestedInput> =
  z
    .object({
      create: z
        .union([z.lazy(() => ProductSiteCreateWithoutProductsInputSchema), z.lazy(() => ProductSiteUncheckedCreateWithoutProductsInputSchema)])
        .optional(),
      connectOrCreate: z.lazy(() => ProductSiteCreateOrConnectWithoutProductsInputSchema).optional(),
      upsert: z.lazy(() => ProductSiteUpsertWithoutProductsInputSchema).optional(),
      connect: z.lazy(() => ProductSiteWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProductSiteUpdateToOneWithWhereWithoutProductsInputSchema),
          z.lazy(() => ProductSiteUpdateWithoutProductsInputSchema),
          z.lazy(() => ProductSiteUncheckedUpdateWithoutProductsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductNutrition100gUpdateOneWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductNutrition100gUpdateOneWithoutProductNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductNutrition100gCreateWithoutProductInputSchema),
          z.lazy(() => ProductNutrition100gUncheckedCreateWithoutProductInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => ProductNutrition100gCreateOrConnectWithoutProductInputSchema).optional(),
      upsert: z.lazy(() => ProductNutrition100gUpsertWithoutProductInputSchema).optional(),
      disconnect: z.union([z.boolean(), z.lazy(() => ProductNutrition100gWhereInputSchema)]).optional(),
      delete: z.union([z.boolean(), z.lazy(() => ProductNutrition100gWhereInputSchema)]).optional(),
      connect: z.lazy(() => ProductNutrition100gWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProductNutrition100gUpdateToOneWithWhereWithoutProductInputSchema),
          z.lazy(() => ProductNutrition100gUpdateWithoutProductInputSchema),
          z.lazy(() => ProductNutrition100gUncheckedUpdateWithoutProductInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductNutritionTotalUpdateOneWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductNutritionTotalUpdateOneWithoutProductNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductNutritionTotalCreateWithoutProductInputSchema),
          z.lazy(() => ProductNutritionTotalUncheckedCreateWithoutProductInputSchema),
        ])
        .optional(),
      connectOrCreate: z.lazy(() => ProductNutritionTotalCreateOrConnectWithoutProductInputSchema).optional(),
      upsert: z.lazy(() => ProductNutritionTotalUpsertWithoutProductInputSchema).optional(),
      disconnect: z.union([z.boolean(), z.lazy(() => ProductNutritionTotalWhereInputSchema)]).optional(),
      delete: z.union([z.boolean(), z.lazy(() => ProductNutritionTotalWhereInputSchema)]).optional(),
      connect: z.lazy(() => ProductNutritionTotalWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProductNutritionTotalUpdateToOneWithWhereWithoutProductInputSchema),
          z.lazy(() => ProductNutritionTotalUpdateWithoutProductInputSchema),
          z.lazy(() => ProductNutritionTotalUncheckedUpdateWithoutProductInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductCreateNestedOneWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutNutrition100gInput> = z
  .object({
    create: z
      .union([z.lazy(() => ProductCreateWithoutNutrition100gInputSchema), z.lazy(() => ProductUncheckedCreateWithoutNutrition100gInputSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutNutrition100gInputSchema).optional(),
    connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedCreateNestedOneWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedOneWithoutNutrition100gInput> =
  z
    .object({
      create: z
        .union([z.lazy(() => ProductCreateWithoutNutrition100gInputSchema), z.lazy(() => ProductUncheckedCreateWithoutNutrition100gInputSchema)])
        .optional(),
      connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutNutrition100gInputSchema).optional(),
      connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    })
    .strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z
  .object({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
  })
  .strict();

export const ProductUpdateOneWithoutNutrition100gNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneWithoutNutrition100gNestedInput> = z
  .object({
    create: z
      .union([z.lazy(() => ProductCreateWithoutNutrition100gInputSchema), z.lazy(() => ProductUncheckedCreateWithoutNutrition100gInputSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutNutrition100gInputSchema).optional(),
    upsert: z.lazy(() => ProductUpsertWithoutNutrition100gInputSchema).optional(),
    disconnect: z.union([z.boolean(), z.lazy(() => ProductWhereInputSchema)]).optional(),
    delete: z.union([z.boolean(), z.lazy(() => ProductWhereInputSchema)]).optional(),
    connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => ProductUpdateToOneWithWhereWithoutNutrition100gInputSchema),
        z.lazy(() => ProductUpdateWithoutNutrition100gInputSchema),
        z.lazy(() => ProductUncheckedUpdateWithoutNutrition100gInputSchema),
      ])
      .optional(),
  })
  .strict();

export const ProductUncheckedUpdateOneWithoutNutrition100gNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateOneWithoutNutrition100gNestedInput> =
  z
    .object({
      create: z
        .union([z.lazy(() => ProductCreateWithoutNutrition100gInputSchema), z.lazy(() => ProductUncheckedCreateWithoutNutrition100gInputSchema)])
        .optional(),
      connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutNutrition100gInputSchema).optional(),
      upsert: z.lazy(() => ProductUpsertWithoutNutrition100gInputSchema).optional(),
      disconnect: z.union([z.boolean(), z.lazy(() => ProductWhereInputSchema)]).optional(),
      delete: z.union([z.boolean(), z.lazy(() => ProductWhereInputSchema)]).optional(),
      connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProductUpdateToOneWithWhereWithoutNutrition100gInputSchema),
          z.lazy(() => ProductUpdateWithoutNutrition100gInputSchema),
          z.lazy(() => ProductUncheckedUpdateWithoutNutrition100gInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductCreateNestedOneWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutNutritionTotalInput> = z
  .object({
    create: z
      .union([z.lazy(() => ProductCreateWithoutNutritionTotalInputSchema), z.lazy(() => ProductUncheckedCreateWithoutNutritionTotalInputSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutNutritionTotalInputSchema).optional(),
    connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedCreateNestedOneWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedOneWithoutNutritionTotalInput> =
  z
    .object({
      create: z
        .union([z.lazy(() => ProductCreateWithoutNutritionTotalInputSchema), z.lazy(() => ProductUncheckedCreateWithoutNutritionTotalInputSchema)])
        .optional(),
      connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutNutritionTotalInputSchema).optional(),
      connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    })
    .strict();

export const ProductUpdateOneWithoutNutritionTotalNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneWithoutNutritionTotalNestedInput> = z
  .object({
    create: z
      .union([z.lazy(() => ProductCreateWithoutNutritionTotalInputSchema), z.lazy(() => ProductUncheckedCreateWithoutNutritionTotalInputSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutNutritionTotalInputSchema).optional(),
    upsert: z.lazy(() => ProductUpsertWithoutNutritionTotalInputSchema).optional(),
    disconnect: z.union([z.boolean(), z.lazy(() => ProductWhereInputSchema)]).optional(),
    delete: z.union([z.boolean(), z.lazy(() => ProductWhereInputSchema)]).optional(),
    connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => ProductUpdateToOneWithWhereWithoutNutritionTotalInputSchema),
        z.lazy(() => ProductUpdateWithoutNutritionTotalInputSchema),
        z.lazy(() => ProductUncheckedUpdateWithoutNutritionTotalInputSchema),
      ])
      .optional(),
  })
  .strict();

export const ProductUncheckedUpdateOneWithoutNutritionTotalNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateOneWithoutNutritionTotalNestedInput> =
  z
    .object({
      create: z
        .union([z.lazy(() => ProductCreateWithoutNutritionTotalInputSchema), z.lazy(() => ProductUncheckedCreateWithoutNutritionTotalInputSchema)])
        .optional(),
      connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutNutritionTotalInputSchema).optional(),
      upsert: z.lazy(() => ProductUpsertWithoutNutritionTotalInputSchema).optional(),
      disconnect: z.union([z.boolean(), z.lazy(() => ProductWhereInputSchema)]).optional(),
      delete: z.union([z.boolean(), z.lazy(() => ProductWhereInputSchema)]).optional(),
      connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ProductUpdateToOneWithWhereWithoutNutritionTotalInputSchema),
          z.lazy(() => ProductUpdateWithoutNutritionTotalInputSchema),
          z.lazy(() => ProductUncheckedUpdateWithoutNutritionTotalInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ProductTypeCreateNestedOneWithoutChildrenInputSchema: z.ZodType<Prisma.ProductTypeCreateNestedOneWithoutChildrenInput> = z
  .object({
    create: z
      .union([z.lazy(() => ProductTypeCreateWithoutChildrenInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutChildrenInputSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => ProductTypeCreateOrConnectWithoutChildrenInputSchema).optional(),
    connect: z.lazy(() => ProductTypeWhereUniqueInputSchema).optional(),
  })
  .strict();

export const ProductTypeCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeCreateNestedManyWithoutParentInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProductTypeCreateWithoutParentInputSchema),
        z.lazy(() => ProductTypeCreateWithoutParentInputSchema).array(),
        z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema),
        z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ProductTypeCreateOrConnectWithoutParentInputSchema),
        z.lazy(() => ProductTypeCreateOrConnectWithoutParentInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ProductTypeCreateManyParentInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
  })
  .strict();

export const ProductCreateNestedManyWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutProductTypeInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProductCreateWithoutProductTypeInputSchema),
        z.lazy(() => ProductCreateWithoutProductTypeInputSchema).array(),
        z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ProductCreateOrConnectWithoutProductTypeInputSchema),
        z.lazy(() => ProductCreateOrConnectWithoutProductTypeInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ProductCreateManyProductTypeInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  })
  .strict();

export const ProductTypeUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeUncheckedCreateNestedManyWithoutParentInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductTypeCreateWithoutParentInputSchema),
          z.lazy(() => ProductTypeCreateWithoutParentInputSchema).array(),
          z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProductTypeCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => ProductTypeCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ProductTypeCreateManyParentInputEnvelopeSchema).optional(),
      connect: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
    })
    .strict();

export const ProductUncheckedCreateNestedManyWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutProductTypeInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductCreateWithoutProductTypeInputSchema),
          z.lazy(() => ProductCreateWithoutProductTypeInputSchema).array(),
          z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema),
          z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProductCreateOrConnectWithoutProductTypeInputSchema),
          z.lazy(() => ProductCreateOrConnectWithoutProductTypeInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ProductCreateManyProductTypeInputEnvelopeSchema).optional(),
      connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    })
    .strict();

export const ProductTypeUpdateOneWithoutChildrenNestedInputSchema: z.ZodType<Prisma.ProductTypeUpdateOneWithoutChildrenNestedInput> = z
  .object({
    create: z
      .union([z.lazy(() => ProductTypeCreateWithoutChildrenInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutChildrenInputSchema)])
      .optional(),
    connectOrCreate: z.lazy(() => ProductTypeCreateOrConnectWithoutChildrenInputSchema).optional(),
    upsert: z.lazy(() => ProductTypeUpsertWithoutChildrenInputSchema).optional(),
    disconnect: z.union([z.boolean(), z.lazy(() => ProductTypeWhereInputSchema)]).optional(),
    delete: z.union([z.boolean(), z.lazy(() => ProductTypeWhereInputSchema)]).optional(),
    connect: z.lazy(() => ProductTypeWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => ProductTypeUpdateToOneWithWhereWithoutChildrenInputSchema),
        z.lazy(() => ProductTypeUpdateWithoutChildrenInputSchema),
        z.lazy(() => ProductTypeUncheckedUpdateWithoutChildrenInputSchema),
      ])
      .optional(),
  })
  .strict();

export const ProductTypeUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.ProductTypeUpdateManyWithoutParentNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProductTypeCreateWithoutParentInputSchema),
        z.lazy(() => ProductTypeCreateWithoutParentInputSchema).array(),
        z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema),
        z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ProductTypeCreateOrConnectWithoutParentInputSchema),
        z.lazy(() => ProductTypeCreateOrConnectWithoutParentInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ProductTypeUpsertWithWhereUniqueWithoutParentInputSchema),
        z.lazy(() => ProductTypeUpsertWithWhereUniqueWithoutParentInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ProductTypeCreateManyParentInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
    update: z
      .union([
        z.lazy(() => ProductTypeUpdateWithWhereUniqueWithoutParentInputSchema),
        z.lazy(() => ProductTypeUpdateWithWhereUniqueWithoutParentInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ProductTypeUpdateManyWithWhereWithoutParentInputSchema),
        z.lazy(() => ProductTypeUpdateManyWithWhereWithoutParentInputSchema).array(),
      ])
      .optional(),
    deleteMany: z.union([z.lazy(() => ProductTypeScalarWhereInputSchema), z.lazy(() => ProductTypeScalarWhereInputSchema).array()]).optional(),
  })
  .strict();

export const ProductUpdateManyWithoutProductTypeNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutProductTypeNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProductCreateWithoutProductTypeInputSchema),
        z.lazy(() => ProductCreateWithoutProductTypeInputSchema).array(),
        z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ProductCreateOrConnectWithoutProductTypeInputSchema),
        z.lazy(() => ProductCreateOrConnectWithoutProductTypeInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ProductUpsertWithWhereUniqueWithoutProductTypeInputSchema),
        z.lazy(() => ProductUpsertWithWhereUniqueWithoutProductTypeInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ProductCreateManyProductTypeInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    update: z
      .union([
        z.lazy(() => ProductUpdateWithWhereUniqueWithoutProductTypeInputSchema),
        z.lazy(() => ProductUpdateWithWhereUniqueWithoutProductTypeInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ProductUpdateManyWithWhereWithoutProductTypeInputSchema),
        z.lazy(() => ProductUpdateManyWithWhereWithoutProductTypeInputSchema).array(),
      ])
      .optional(),
    deleteMany: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
  })
  .strict();

export const ProductTypeUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.ProductTypeUncheckedUpdateManyWithoutParentNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductTypeCreateWithoutParentInputSchema),
          z.lazy(() => ProductTypeCreateWithoutParentInputSchema).array(),
          z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProductTypeCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => ProductTypeCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ProductTypeUpsertWithWhereUniqueWithoutParentInputSchema),
          z.lazy(() => ProductTypeUpsertWithWhereUniqueWithoutParentInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ProductTypeCreateManyParentInputEnvelopeSchema).optional(),
      set: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
      disconnect: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
      delete: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
      connect: z.union([z.lazy(() => ProductTypeWhereUniqueInputSchema), z.lazy(() => ProductTypeWhereUniqueInputSchema).array()]).optional(),
      update: z
        .union([
          z.lazy(() => ProductTypeUpdateWithWhereUniqueWithoutParentInputSchema),
          z.lazy(() => ProductTypeUpdateWithWhereUniqueWithoutParentInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ProductTypeUpdateManyWithWhereWithoutParentInputSchema),
          z.lazy(() => ProductTypeUpdateManyWithWhereWithoutParentInputSchema).array(),
        ])
        .optional(),
      deleteMany: z.union([z.lazy(() => ProductTypeScalarWhereInputSchema), z.lazy(() => ProductTypeScalarWhereInputSchema).array()]).optional(),
    })
    .strict();

export const ProductUncheckedUpdateManyWithoutProductTypeNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutProductTypeNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ProductCreateWithoutProductTypeInputSchema),
          z.lazy(() => ProductCreateWithoutProductTypeInputSchema).array(),
          z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema),
          z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ProductCreateOrConnectWithoutProductTypeInputSchema),
          z.lazy(() => ProductCreateOrConnectWithoutProductTypeInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ProductUpsertWithWhereUniqueWithoutProductTypeInputSchema),
          z.lazy(() => ProductUpsertWithWhereUniqueWithoutProductTypeInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => ProductCreateManyProductTypeInputEnvelopeSchema).optional(),
      set: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
      disconnect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
      delete: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
      connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
      update: z
        .union([
          z.lazy(() => ProductUpdateWithWhereUniqueWithoutProductTypeInputSchema),
          z.lazy(() => ProductUpdateWithWhereUniqueWithoutProductTypeInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ProductUpdateManyWithWhereWithoutProductTypeInputSchema),
          z.lazy(() => ProductUpdateManyWithWhereWithoutProductTypeInputSchema).array(),
        ])
        .optional(),
      deleteMany: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
    })
    .strict();

export const ProductCreateNestedManyWithoutSiteInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutSiteInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProductCreateWithoutSiteInputSchema),
        z.lazy(() => ProductCreateWithoutSiteInputSchema).array(),
        z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([z.lazy(() => ProductCreateOrConnectWithoutSiteInputSchema), z.lazy(() => ProductCreateOrConnectWithoutSiteInputSchema).array()])
      .optional(),
    createMany: z.lazy(() => ProductCreateManySiteInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  })
  .strict();

export const ProductUncheckedCreateNestedManyWithoutSiteInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutSiteInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProductCreateWithoutSiteInputSchema),
        z.lazy(() => ProductCreateWithoutSiteInputSchema).array(),
        z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([z.lazy(() => ProductCreateOrConnectWithoutSiteInputSchema), z.lazy(() => ProductCreateOrConnectWithoutSiteInputSchema).array()])
      .optional(),
    createMany: z.lazy(() => ProductCreateManySiteInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
  })
  .strict();

export const ProductUpdateManyWithoutSiteNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutSiteNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProductCreateWithoutSiteInputSchema),
        z.lazy(() => ProductCreateWithoutSiteInputSchema).array(),
        z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([z.lazy(() => ProductCreateOrConnectWithoutSiteInputSchema), z.lazy(() => ProductCreateOrConnectWithoutSiteInputSchema).array()])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ProductUpsertWithWhereUniqueWithoutSiteInputSchema),
        z.lazy(() => ProductUpsertWithWhereUniqueWithoutSiteInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ProductCreateManySiteInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    update: z
      .union([
        z.lazy(() => ProductUpdateWithWhereUniqueWithoutSiteInputSchema),
        z.lazy(() => ProductUpdateWithWhereUniqueWithoutSiteInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([z.lazy(() => ProductUpdateManyWithWhereWithoutSiteInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutSiteInputSchema).array()])
      .optional(),
    deleteMany: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
  })
  .strict();

export const ProductUncheckedUpdateManyWithoutSiteNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutSiteNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ProductCreateWithoutSiteInputSchema),
        z.lazy(() => ProductCreateWithoutSiteInputSchema).array(),
        z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema),
        z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([z.lazy(() => ProductCreateOrConnectWithoutSiteInputSchema), z.lazy(() => ProductCreateOrConnectWithoutSiteInputSchema).array()])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ProductUpsertWithWhereUniqueWithoutSiteInputSchema),
        z.lazy(() => ProductUpsertWithWhereUniqueWithoutSiteInputSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ProductCreateManySiteInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => ProductWhereUniqueInputSchema), z.lazy(() => ProductWhereUniqueInputSchema).array()]).optional(),
    update: z
      .union([
        z.lazy(() => ProductUpdateWithWhereUniqueWithoutSiteInputSchema),
        z.lazy(() => ProductUpdateWithWhereUniqueWithoutSiteInputSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([z.lazy(() => ProductUpdateManyWithWhereWithoutSiteInputSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutSiteInputSchema).array()])
      .optional(),
    deleteMany: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
  })
  .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
  })
  .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })
  .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  })
  .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
  })
  .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  })
  .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })
  .strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
    _min: z.lazy(() => NestedFloatFilterSchema).optional(),
    _max: z.lazy(() => NestedFloatFilterSchema).optional(),
  })
  .strict();

export const ProductTypeCreateWithoutProductsInputSchema: z.ZodType<Prisma.ProductTypeCreateWithoutProductsInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    parent: z.lazy(() => ProductTypeCreateNestedOneWithoutChildrenInputSchema).optional(),
    children: z.lazy(() => ProductTypeCreateNestedManyWithoutParentInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.ProductTypeUncheckedCreateWithoutProductsInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    parentId: z.string().optional().nullable(),
    children: z.lazy(() => ProductTypeUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
  })
  .strict();

export const ProductTypeCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.ProductTypeCreateOrConnectWithoutProductsInput> = z
  .object({
    where: z.lazy(() => ProductTypeWhereUniqueInputSchema),
    create: z.union([z.lazy(() => ProductTypeCreateWithoutProductsInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutProductsInputSchema)]),
  })
  .strict();

export const ProductSiteCreateWithoutProductsInputSchema: z.ZodType<Prisma.ProductSiteCreateWithoutProductsInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
  })
  .strict();

export const ProductSiteUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.ProductSiteUncheckedCreateWithoutProductsInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
  })
  .strict();

export const ProductSiteCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.ProductSiteCreateOrConnectWithoutProductsInput> = z
  .object({
    where: z.lazy(() => ProductSiteWhereUniqueInputSchema),
    create: z.union([z.lazy(() => ProductSiteCreateWithoutProductsInputSchema), z.lazy(() => ProductSiteUncheckedCreateWithoutProductsInputSchema)]),
  })
  .strict();

export const ProductNutrition100gCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductNutrition100gCreateWithoutProductInput> = z
  .object({
    id: z.string().optional(),
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

export const ProductNutrition100gUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductNutrition100gUncheckedCreateWithoutProductInput> =
  z
    .object({
      id: z.string().optional(),
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

export const ProductNutrition100gCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.ProductNutrition100gCreateOrConnectWithoutProductInput> =
  z
    .object({
      where: z.lazy(() => ProductNutrition100gWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProductNutrition100gCreateWithoutProductInputSchema),
        z.lazy(() => ProductNutrition100gUncheckedCreateWithoutProductInputSchema),
      ]),
    })
    .strict();

export const ProductNutritionTotalCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductNutritionTotalCreateWithoutProductInput> = z
  .object({
    id: z.string().optional(),
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

export const ProductNutritionTotalUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductNutritionTotalUncheckedCreateWithoutProductInput> =
  z
    .object({
      id: z.string().optional(),
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

export const ProductNutritionTotalCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.ProductNutritionTotalCreateOrConnectWithoutProductInput> =
  z
    .object({
      where: z.lazy(() => ProductNutritionTotalWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ProductNutritionTotalCreateWithoutProductInputSchema),
        z.lazy(() => ProductNutritionTotalUncheckedCreateWithoutProductInputSchema),
      ]),
    })
    .strict();

export const ProductTypeUpsertWithoutProductsInputSchema: z.ZodType<Prisma.ProductTypeUpsertWithoutProductsInput> = z
  .object({
    update: z.union([z.lazy(() => ProductTypeUpdateWithoutProductsInputSchema), z.lazy(() => ProductTypeUncheckedUpdateWithoutProductsInputSchema)]),
    create: z.union([z.lazy(() => ProductTypeCreateWithoutProductsInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutProductsInputSchema)]),
    where: z.lazy(() => ProductTypeWhereInputSchema).optional(),
  })
  .strict();

export const ProductTypeUpdateToOneWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.ProductTypeUpdateToOneWithWhereWithoutProductsInput> = z
  .object({
    where: z.lazy(() => ProductTypeWhereInputSchema).optional(),
    data: z.union([z.lazy(() => ProductTypeUpdateWithoutProductsInputSchema), z.lazy(() => ProductTypeUncheckedUpdateWithoutProductsInputSchema)]),
  })
  .strict();

export const ProductTypeUpdateWithoutProductsInputSchema: z.ZodType<Prisma.ProductTypeUpdateWithoutProductsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    parent: z.lazy(() => ProductTypeUpdateOneWithoutChildrenNestedInputSchema).optional(),
    children: z.lazy(() => ProductTypeUpdateManyWithoutParentNestedInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.ProductTypeUncheckedUpdateWithoutProductsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    parentId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    children: z.lazy(() => ProductTypeUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
  })
  .strict();

export const ProductSiteUpsertWithoutProductsInputSchema: z.ZodType<Prisma.ProductSiteUpsertWithoutProductsInput> = z
  .object({
    update: z.union([z.lazy(() => ProductSiteUpdateWithoutProductsInputSchema), z.lazy(() => ProductSiteUncheckedUpdateWithoutProductsInputSchema)]),
    create: z.union([z.lazy(() => ProductSiteCreateWithoutProductsInputSchema), z.lazy(() => ProductSiteUncheckedCreateWithoutProductsInputSchema)]),
    where: z.lazy(() => ProductSiteWhereInputSchema).optional(),
  })
  .strict();

export const ProductSiteUpdateToOneWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.ProductSiteUpdateToOneWithWhereWithoutProductsInput> = z
  .object({
    where: z.lazy(() => ProductSiteWhereInputSchema).optional(),
    data: z.union([z.lazy(() => ProductSiteUpdateWithoutProductsInputSchema), z.lazy(() => ProductSiteUncheckedUpdateWithoutProductsInputSchema)]),
  })
  .strict();

export const ProductSiteUpdateWithoutProductsInputSchema: z.ZodType<Prisma.ProductSiteUpdateWithoutProductsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductSiteUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.ProductSiteUncheckedUpdateWithoutProductsInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductNutrition100gUpsertWithoutProductInputSchema: z.ZodType<Prisma.ProductNutrition100gUpsertWithoutProductInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProductNutrition100gUpdateWithoutProductInputSchema),
      z.lazy(() => ProductNutrition100gUncheckedUpdateWithoutProductInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ProductNutrition100gCreateWithoutProductInputSchema),
      z.lazy(() => ProductNutrition100gUncheckedCreateWithoutProductInputSchema),
    ]),
    where: z.lazy(() => ProductNutrition100gWhereInputSchema).optional(),
  })
  .strict();

export const ProductNutrition100gUpdateToOneWithWhereWithoutProductInputSchema: z.ZodType<Prisma.ProductNutrition100gUpdateToOneWithWhereWithoutProductInput> =
  z
    .object({
      where: z.lazy(() => ProductNutrition100gWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProductNutrition100gUpdateWithoutProductInputSchema),
        z.lazy(() => ProductNutrition100gUncheckedUpdateWithoutProductInputSchema),
      ]),
    })
    .strict();

export const ProductNutrition100gUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductNutrition100gUpdateWithoutProductInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductNutrition100gUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductNutrition100gUncheckedUpdateWithoutProductInput> =
  z
    .object({
      id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict();

export const ProductNutritionTotalUpsertWithoutProductInputSchema: z.ZodType<Prisma.ProductNutritionTotalUpsertWithoutProductInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProductNutritionTotalUpdateWithoutProductInputSchema),
      z.lazy(() => ProductNutritionTotalUncheckedUpdateWithoutProductInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ProductNutritionTotalCreateWithoutProductInputSchema),
      z.lazy(() => ProductNutritionTotalUncheckedCreateWithoutProductInputSchema),
    ]),
    where: z.lazy(() => ProductNutritionTotalWhereInputSchema).optional(),
  })
  .strict();

export const ProductNutritionTotalUpdateToOneWithWhereWithoutProductInputSchema: z.ZodType<Prisma.ProductNutritionTotalUpdateToOneWithWhereWithoutProductInput> =
  z
    .object({
      where: z.lazy(() => ProductNutritionTotalWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ProductNutritionTotalUpdateWithoutProductInputSchema),
        z.lazy(() => ProductNutritionTotalUncheckedUpdateWithoutProductInputSchema),
      ]),
    })
    .strict();

export const ProductNutritionTotalUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductNutritionTotalUpdateWithoutProductInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductNutritionTotalUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductNutritionTotalUncheckedUpdateWithoutProductInput> =
  z
    .object({
      id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      calories: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      carbohydrates: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      sugars: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      protein: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      fat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      saturatedFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      transFat: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      cholesterol: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
      sodium: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
    })
    .strict();

export const ProductCreateWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductCreateWithoutNutrition100gInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    productType: z.lazy(() => ProductTypeCreateNestedOneWithoutProductsInputSchema),
    site: z.lazy(() => ProductSiteCreateNestedOneWithoutProductsInputSchema),
    nutritionTotal: z.lazy(() => ProductNutritionTotalCreateNestedOneWithoutProductInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedCreateWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutNutrition100gInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    productTypeId: z.string(),
    siteId: z.string(),
    nutritionTotalId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductCreateOrConnectWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutNutrition100gInput> = z
  .object({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ProductCreateWithoutNutrition100gInputSchema),
      z.lazy(() => ProductUncheckedCreateWithoutNutrition100gInputSchema),
    ]),
  })
  .strict();

export const ProductUpsertWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductUpsertWithoutNutrition100gInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProductUpdateWithoutNutrition100gInputSchema),
      z.lazy(() => ProductUncheckedUpdateWithoutNutrition100gInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ProductCreateWithoutNutrition100gInputSchema),
      z.lazy(() => ProductUncheckedCreateWithoutNutrition100gInputSchema),
    ]),
    where: z.lazy(() => ProductWhereInputSchema).optional(),
  })
  .strict();

export const ProductUpdateToOneWithWhereWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutNutrition100gInput> = z
  .object({
    where: z.lazy(() => ProductWhereInputSchema).optional(),
    data: z.union([z.lazy(() => ProductUpdateWithoutNutrition100gInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutNutrition100gInputSchema)]),
  })
  .strict();

export const ProductUpdateWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductUpdateWithoutNutrition100gInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    productType: z.lazy(() => ProductTypeUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
    site: z.lazy(() => ProductSiteUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
    nutritionTotal: z.lazy(() => ProductNutritionTotalUpdateOneWithoutProductNestedInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedUpdateWithoutNutrition100gInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutNutrition100gInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productTypeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    siteId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    nutritionTotalId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductCreateWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductCreateWithoutNutritionTotalInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    productType: z.lazy(() => ProductTypeCreateNestedOneWithoutProductsInputSchema),
    site: z.lazy(() => ProductSiteCreateNestedOneWithoutProductsInputSchema),
    nutrition100g: z.lazy(() => ProductNutrition100gCreateNestedOneWithoutProductInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedCreateWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutNutritionTotalInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    productTypeId: z.string(),
    siteId: z.string(),
    nutrition100gId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductCreateOrConnectWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutNutritionTotalInput> = z
  .object({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ProductCreateWithoutNutritionTotalInputSchema),
      z.lazy(() => ProductUncheckedCreateWithoutNutritionTotalInputSchema),
    ]),
  })
  .strict();

export const ProductUpsertWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductUpsertWithoutNutritionTotalInput> = z
  .object({
    update: z.union([
      z.lazy(() => ProductUpdateWithoutNutritionTotalInputSchema),
      z.lazy(() => ProductUncheckedUpdateWithoutNutritionTotalInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ProductCreateWithoutNutritionTotalInputSchema),
      z.lazy(() => ProductUncheckedCreateWithoutNutritionTotalInputSchema),
    ]),
    where: z.lazy(() => ProductWhereInputSchema).optional(),
  })
  .strict();

export const ProductUpdateToOneWithWhereWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutNutritionTotalInput> = z
  .object({
    where: z.lazy(() => ProductWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => ProductUpdateWithoutNutritionTotalInputSchema),
      z.lazy(() => ProductUncheckedUpdateWithoutNutritionTotalInputSchema),
    ]),
  })
  .strict();

export const ProductUpdateWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductUpdateWithoutNutritionTotalInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    productType: z.lazy(() => ProductTypeUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
    site: z.lazy(() => ProductSiteUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
    nutrition100g: z.lazy(() => ProductNutrition100gUpdateOneWithoutProductNestedInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedUpdateWithoutNutritionTotalInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutNutritionTotalInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productTypeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    siteId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    nutrition100gId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductTypeCreateWithoutChildrenInputSchema: z.ZodType<Prisma.ProductTypeCreateWithoutChildrenInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    parent: z.lazy(() => ProductTypeCreateNestedOneWithoutChildrenInputSchema).optional(),
    products: z.lazy(() => ProductCreateNestedManyWithoutProductTypeInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedCreateWithoutChildrenInputSchema: z.ZodType<Prisma.ProductTypeUncheckedCreateWithoutChildrenInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    parentId: z.string().optional().nullable(),
    products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutProductTypeInputSchema).optional(),
  })
  .strict();

export const ProductTypeCreateOrConnectWithoutChildrenInputSchema: z.ZodType<Prisma.ProductTypeCreateOrConnectWithoutChildrenInput> = z
  .object({
    where: z.lazy(() => ProductTypeWhereUniqueInputSchema),
    create: z.union([z.lazy(() => ProductTypeCreateWithoutChildrenInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutChildrenInputSchema)]),
  })
  .strict();

export const ProductTypeCreateWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeCreateWithoutParentInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    children: z.lazy(() => ProductTypeCreateNestedManyWithoutParentInputSchema).optional(),
    products: z.lazy(() => ProductCreateNestedManyWithoutProductTypeInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeUncheckedCreateWithoutParentInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    children: z.lazy(() => ProductTypeUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
    products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutProductTypeInputSchema).optional(),
  })
  .strict();

export const ProductTypeCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeCreateOrConnectWithoutParentInput> = z
  .object({
    where: z.lazy(() => ProductTypeWhereUniqueInputSchema),
    create: z.union([z.lazy(() => ProductTypeCreateWithoutParentInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema)]),
  })
  .strict();

export const ProductTypeCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.ProductTypeCreateManyParentInputEnvelope> = z
  .object({
    data: z.union([z.lazy(() => ProductTypeCreateManyParentInputSchema), z.lazy(() => ProductTypeCreateManyParentInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductCreateWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductCreateWithoutProductTypeInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    site: z.lazy(() => ProductSiteCreateNestedOneWithoutProductsInputSchema),
    nutrition100g: z.lazy(() => ProductNutrition100gCreateNestedOneWithoutProductInputSchema).optional(),
    nutritionTotal: z.lazy(() => ProductNutritionTotalCreateNestedOneWithoutProductInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedCreateWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutProductTypeInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    siteId: z.string(),
    nutrition100gId: z.string().optional().nullable(),
    nutritionTotalId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductCreateOrConnectWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutProductTypeInput> = z
  .object({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    create: z.union([z.lazy(() => ProductCreateWithoutProductTypeInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema)]),
  })
  .strict();

export const ProductCreateManyProductTypeInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyProductTypeInputEnvelope> = z
  .object({
    data: z.union([z.lazy(() => ProductCreateManyProductTypeInputSchema), z.lazy(() => ProductCreateManyProductTypeInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductTypeUpsertWithoutChildrenInputSchema: z.ZodType<Prisma.ProductTypeUpsertWithoutChildrenInput> = z
  .object({
    update: z.union([z.lazy(() => ProductTypeUpdateWithoutChildrenInputSchema), z.lazy(() => ProductTypeUncheckedUpdateWithoutChildrenInputSchema)]),
    create: z.union([z.lazy(() => ProductTypeCreateWithoutChildrenInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutChildrenInputSchema)]),
    where: z.lazy(() => ProductTypeWhereInputSchema).optional(),
  })
  .strict();

export const ProductTypeUpdateToOneWithWhereWithoutChildrenInputSchema: z.ZodType<Prisma.ProductTypeUpdateToOneWithWhereWithoutChildrenInput> = z
  .object({
    where: z.lazy(() => ProductTypeWhereInputSchema).optional(),
    data: z.union([z.lazy(() => ProductTypeUpdateWithoutChildrenInputSchema), z.lazy(() => ProductTypeUncheckedUpdateWithoutChildrenInputSchema)]),
  })
  .strict();

export const ProductTypeUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.ProductTypeUpdateWithoutChildrenInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    parent: z.lazy(() => ProductTypeUpdateOneWithoutChildrenNestedInputSchema).optional(),
    products: z.lazy(() => ProductUpdateManyWithoutProductTypeNestedInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.ProductTypeUncheckedUpdateWithoutChildrenInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    parentId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    products: z.lazy(() => ProductUncheckedUpdateManyWithoutProductTypeNestedInputSchema).optional(),
  })
  .strict();

export const ProductTypeUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeUpsertWithWhereUniqueWithoutParentInput> = z
  .object({
    where: z.lazy(() => ProductTypeWhereUniqueInputSchema),
    update: z.union([z.lazy(() => ProductTypeUpdateWithoutParentInputSchema), z.lazy(() => ProductTypeUncheckedUpdateWithoutParentInputSchema)]),
    create: z.union([z.lazy(() => ProductTypeCreateWithoutParentInputSchema), z.lazy(() => ProductTypeUncheckedCreateWithoutParentInputSchema)]),
  })
  .strict();

export const ProductTypeUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeUpdateWithWhereUniqueWithoutParentInput> = z
  .object({
    where: z.lazy(() => ProductTypeWhereUniqueInputSchema),
    data: z.union([z.lazy(() => ProductTypeUpdateWithoutParentInputSchema), z.lazy(() => ProductTypeUncheckedUpdateWithoutParentInputSchema)]),
  })
  .strict();

export const ProductTypeUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeUpdateManyWithWhereWithoutParentInput> = z
  .object({
    where: z.lazy(() => ProductTypeScalarWhereInputSchema),
    data: z.union([z.lazy(() => ProductTypeUpdateManyMutationInputSchema), z.lazy(() => ProductTypeUncheckedUpdateManyWithoutParentInputSchema)]),
  })
  .strict();

export const ProductTypeScalarWhereInputSchema: z.ZodType<Prisma.ProductTypeScalarWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => ProductTypeScalarWhereInputSchema), z.lazy(() => ProductTypeScalarWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => ProductTypeScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => ProductTypeScalarWhereInputSchema), z.lazy(() => ProductTypeScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    parentId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const ProductUpsertWithWhereUniqueWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutProductTypeInput> = z
  .object({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    update: z.union([z.lazy(() => ProductUpdateWithoutProductTypeInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutProductTypeInputSchema)]),
    create: z.union([z.lazy(() => ProductCreateWithoutProductTypeInputSchema), z.lazy(() => ProductUncheckedCreateWithoutProductTypeInputSchema)]),
  })
  .strict();

export const ProductUpdateWithWhereUniqueWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutProductTypeInput> = z
  .object({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    data: z.union([z.lazy(() => ProductUpdateWithoutProductTypeInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutProductTypeInputSchema)]),
  })
  .strict();

export const ProductUpdateManyWithWhereWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutProductTypeInput> = z
  .object({
    where: z.lazy(() => ProductScalarWhereInputSchema),
    data: z.union([z.lazy(() => ProductUpdateManyMutationInputSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutProductTypeInputSchema)]),
  })
  .strict();

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> = z
  .object({
    AND: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
    OR: z
      .lazy(() => ProductScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z.union([z.lazy(() => ProductScalarWhereInputSchema), z.lazy(() => ProductScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    price: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    pricePer100g: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    productUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    affiliateUrl: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    productTypeId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    siteId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    nutrition100gId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  })
  .strict();

export const ProductCreateWithoutSiteInputSchema: z.ZodType<Prisma.ProductCreateWithoutSiteInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    productType: z.lazy(() => ProductTypeCreateNestedOneWithoutProductsInputSchema),
    nutrition100g: z.lazy(() => ProductNutrition100gCreateNestedOneWithoutProductInputSchema).optional(),
    nutritionTotal: z.lazy(() => ProductNutritionTotalCreateNestedOneWithoutProductInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedCreateWithoutSiteInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutSiteInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    productTypeId: z.string(),
    nutrition100gId: z.string().optional().nullable(),
    nutritionTotalId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductCreateOrConnectWithoutSiteInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutSiteInput> = z
  .object({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    create: z.union([z.lazy(() => ProductCreateWithoutSiteInputSchema), z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema)]),
  })
  .strict();

export const ProductCreateManySiteInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManySiteInputEnvelope> = z
  .object({
    data: z.union([z.lazy(() => ProductCreateManySiteInputSchema), z.lazy(() => ProductCreateManySiteInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductUpsertWithWhereUniqueWithoutSiteInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutSiteInput> = z
  .object({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    update: z.union([z.lazy(() => ProductUpdateWithoutSiteInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutSiteInputSchema)]),
    create: z.union([z.lazy(() => ProductCreateWithoutSiteInputSchema), z.lazy(() => ProductUncheckedCreateWithoutSiteInputSchema)]),
  })
  .strict();

export const ProductUpdateWithWhereUniqueWithoutSiteInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutSiteInput> = z
  .object({
    where: z.lazy(() => ProductWhereUniqueInputSchema),
    data: z.union([z.lazy(() => ProductUpdateWithoutSiteInputSchema), z.lazy(() => ProductUncheckedUpdateWithoutSiteInputSchema)]),
  })
  .strict();

export const ProductUpdateManyWithWhereWithoutSiteInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutSiteInput> = z
  .object({
    where: z.lazy(() => ProductScalarWhereInputSchema),
    data: z.union([z.lazy(() => ProductUpdateManyMutationInputSchema), z.lazy(() => ProductUncheckedUpdateManyWithoutSiteInputSchema)]),
  })
  .strict();

export const ProductTypeCreateManyParentInputSchema: z.ZodType<Prisma.ProductTypeCreateManyParentInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
  })
  .strict();

export const ProductCreateManyProductTypeInputSchema: z.ZodType<Prisma.ProductCreateManyProductTypeInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    siteId: z.string(),
    nutrition100gId: z.string().optional().nullable(),
    nutritionTotalId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductTypeUpdateWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeUpdateWithoutParentInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    children: z.lazy(() => ProductTypeUpdateManyWithoutParentNestedInputSchema).optional(),
    products: z.lazy(() => ProductUpdateManyWithoutProductTypeNestedInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeUncheckedUpdateWithoutParentInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    children: z.lazy(() => ProductTypeUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
    products: z.lazy(() => ProductUncheckedUpdateManyWithoutProductTypeNestedInputSchema).optional(),
  })
  .strict();

export const ProductTypeUncheckedUpdateManyWithoutParentInputSchema: z.ZodType<Prisma.ProductTypeUncheckedUpdateManyWithoutParentInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductUpdateWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductUpdateWithoutProductTypeInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    site: z.lazy(() => ProductSiteUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
    nutrition100g: z.lazy(() => ProductNutrition100gUpdateOneWithoutProductNestedInputSchema).optional(),
    nutritionTotal: z.lazy(() => ProductNutritionTotalUpdateOneWithoutProductNestedInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedUpdateWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutProductTypeInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    siteId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    nutrition100gId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductUncheckedUpdateManyWithoutProductTypeInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutProductTypeInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    siteId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    nutrition100gId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductCreateManySiteInputSchema: z.ZodType<Prisma.ProductCreateManySiteInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    price: z.number().int(),
    pricePer100g: z.number().int().optional().nullable(),
    productUrl: z.string(),
    affiliateUrl: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    productTypeId: z.string(),
    nutrition100gId: z.string().optional().nullable(),
    nutritionTotalId: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const ProductUpdateWithoutSiteInputSchema: z.ZodType<Prisma.ProductUpdateWithoutSiteInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    productType: z.lazy(() => ProductTypeUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
    nutrition100g: z.lazy(() => ProductNutrition100gUpdateOneWithoutProductNestedInputSchema).optional(),
    nutritionTotal: z.lazy(() => ProductNutritionTotalUpdateOneWithoutProductNestedInputSchema).optional(),
  })
  .strict();

export const ProductUncheckedUpdateWithoutSiteInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutSiteInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productTypeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    nutrition100gId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

export const ProductUncheckedUpdateManyWithoutSiteInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutSiteInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    price: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    pricePer100g: z
      .union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    affiliateUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    imageUrl: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    productTypeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    nutrition100gId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    nutritionTotalId: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereInputSchema.optional(),
    orderBy: z.union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema]).optional(),
    cursor: ProductWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereInputSchema.optional(),
    orderBy: z.union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema]).optional(),
    cursor: ProductWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereInputSchema.optional(),
    orderBy: z.union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema]).optional(),
    cursor: ProductWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> = z
  .object({
    where: ProductWhereInputSchema.optional(),
    orderBy: z.union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema]).optional(),
    cursor: ProductWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z
  .object({
    where: ProductWhereInputSchema.optional(),
    orderBy: z.union([ProductOrderByWithAggregationInputSchema.array(), ProductOrderByWithAggregationInputSchema]).optional(),
    by: ProductScalarFieldEnumSchema.array(),
    having: ProductScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereUniqueInputSchema,
  })
  .strict();

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereUniqueInputSchema,
  })
  .strict();

export const ProductNutrition100gFindFirstArgsSchema: z.ZodType<Prisma.ProductNutrition100gFindFirstArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    where: ProductNutrition100gWhereInputSchema.optional(),
    orderBy: z.union([ProductNutrition100gOrderByWithRelationInputSchema.array(), ProductNutrition100gOrderByWithRelationInputSchema]).optional(),
    cursor: ProductNutrition100gWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductNutrition100gScalarFieldEnumSchema, ProductNutrition100gScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductNutrition100gFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductNutrition100gFindFirstOrThrowArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    where: ProductNutrition100gWhereInputSchema.optional(),
    orderBy: z.union([ProductNutrition100gOrderByWithRelationInputSchema.array(), ProductNutrition100gOrderByWithRelationInputSchema]).optional(),
    cursor: ProductNutrition100gWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductNutrition100gScalarFieldEnumSchema, ProductNutrition100gScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductNutrition100gFindManyArgsSchema: z.ZodType<Prisma.ProductNutrition100gFindManyArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    where: ProductNutrition100gWhereInputSchema.optional(),
    orderBy: z.union([ProductNutrition100gOrderByWithRelationInputSchema.array(), ProductNutrition100gOrderByWithRelationInputSchema]).optional(),
    cursor: ProductNutrition100gWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductNutrition100gScalarFieldEnumSchema, ProductNutrition100gScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductNutrition100gAggregateArgsSchema: z.ZodType<Prisma.ProductNutrition100gAggregateArgs> = z
  .object({
    where: ProductNutrition100gWhereInputSchema.optional(),
    orderBy: z.union([ProductNutrition100gOrderByWithRelationInputSchema.array(), ProductNutrition100gOrderByWithRelationInputSchema]).optional(),
    cursor: ProductNutrition100gWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductNutrition100gGroupByArgsSchema: z.ZodType<Prisma.ProductNutrition100gGroupByArgs> = z
  .object({
    where: ProductNutrition100gWhereInputSchema.optional(),
    orderBy: z
      .union([ProductNutrition100gOrderByWithAggregationInputSchema.array(), ProductNutrition100gOrderByWithAggregationInputSchema])
      .optional(),
    by: ProductNutrition100gScalarFieldEnumSchema.array(),
    having: ProductNutrition100gScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductNutrition100gFindUniqueArgsSchema: z.ZodType<Prisma.ProductNutrition100gFindUniqueArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    where: ProductNutrition100gWhereUniqueInputSchema,
  })
  .strict();

export const ProductNutrition100gFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductNutrition100gFindUniqueOrThrowArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    where: ProductNutrition100gWhereUniqueInputSchema,
  })
  .strict();

export const ProductNutritionTotalFindFirstArgsSchema: z.ZodType<Prisma.ProductNutritionTotalFindFirstArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    where: ProductNutritionTotalWhereInputSchema.optional(),
    orderBy: z.union([ProductNutritionTotalOrderByWithRelationInputSchema.array(), ProductNutritionTotalOrderByWithRelationInputSchema]).optional(),
    cursor: ProductNutritionTotalWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductNutritionTotalScalarFieldEnumSchema, ProductNutritionTotalScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductNutritionTotalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductNutritionTotalFindFirstOrThrowArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    where: ProductNutritionTotalWhereInputSchema.optional(),
    orderBy: z.union([ProductNutritionTotalOrderByWithRelationInputSchema.array(), ProductNutritionTotalOrderByWithRelationInputSchema]).optional(),
    cursor: ProductNutritionTotalWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductNutritionTotalScalarFieldEnumSchema, ProductNutritionTotalScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductNutritionTotalFindManyArgsSchema: z.ZodType<Prisma.ProductNutritionTotalFindManyArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    where: ProductNutritionTotalWhereInputSchema.optional(),
    orderBy: z.union([ProductNutritionTotalOrderByWithRelationInputSchema.array(), ProductNutritionTotalOrderByWithRelationInputSchema]).optional(),
    cursor: ProductNutritionTotalWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductNutritionTotalScalarFieldEnumSchema, ProductNutritionTotalScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductNutritionTotalAggregateArgsSchema: z.ZodType<Prisma.ProductNutritionTotalAggregateArgs> = z
  .object({
    where: ProductNutritionTotalWhereInputSchema.optional(),
    orderBy: z.union([ProductNutritionTotalOrderByWithRelationInputSchema.array(), ProductNutritionTotalOrderByWithRelationInputSchema]).optional(),
    cursor: ProductNutritionTotalWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductNutritionTotalGroupByArgsSchema: z.ZodType<Prisma.ProductNutritionTotalGroupByArgs> = z
  .object({
    where: ProductNutritionTotalWhereInputSchema.optional(),
    orderBy: z
      .union([ProductNutritionTotalOrderByWithAggregationInputSchema.array(), ProductNutritionTotalOrderByWithAggregationInputSchema])
      .optional(),
    by: ProductNutritionTotalScalarFieldEnumSchema.array(),
    having: ProductNutritionTotalScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductNutritionTotalFindUniqueArgsSchema: z.ZodType<Prisma.ProductNutritionTotalFindUniqueArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    where: ProductNutritionTotalWhereUniqueInputSchema,
  })
  .strict();

export const ProductNutritionTotalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductNutritionTotalFindUniqueOrThrowArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    where: ProductNutritionTotalWhereUniqueInputSchema,
  })
  .strict();

export const ProductTypeFindFirstArgsSchema: z.ZodType<Prisma.ProductTypeFindFirstArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    where: ProductTypeWhereInputSchema.optional(),
    orderBy: z.union([ProductTypeOrderByWithRelationInputSchema.array(), ProductTypeOrderByWithRelationInputSchema]).optional(),
    cursor: ProductTypeWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductTypeScalarFieldEnumSchema, ProductTypeScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductTypeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductTypeFindFirstOrThrowArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    where: ProductTypeWhereInputSchema.optional(),
    orderBy: z.union([ProductTypeOrderByWithRelationInputSchema.array(), ProductTypeOrderByWithRelationInputSchema]).optional(),
    cursor: ProductTypeWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductTypeScalarFieldEnumSchema, ProductTypeScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductTypeFindManyArgsSchema: z.ZodType<Prisma.ProductTypeFindManyArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    where: ProductTypeWhereInputSchema.optional(),
    orderBy: z.union([ProductTypeOrderByWithRelationInputSchema.array(), ProductTypeOrderByWithRelationInputSchema]).optional(),
    cursor: ProductTypeWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductTypeScalarFieldEnumSchema, ProductTypeScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductTypeAggregateArgsSchema: z.ZodType<Prisma.ProductTypeAggregateArgs> = z
  .object({
    where: ProductTypeWhereInputSchema.optional(),
    orderBy: z.union([ProductTypeOrderByWithRelationInputSchema.array(), ProductTypeOrderByWithRelationInputSchema]).optional(),
    cursor: ProductTypeWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductTypeGroupByArgsSchema: z.ZodType<Prisma.ProductTypeGroupByArgs> = z
  .object({
    where: ProductTypeWhereInputSchema.optional(),
    orderBy: z.union([ProductTypeOrderByWithAggregationInputSchema.array(), ProductTypeOrderByWithAggregationInputSchema]).optional(),
    by: ProductTypeScalarFieldEnumSchema.array(),
    having: ProductTypeScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductTypeFindUniqueArgsSchema: z.ZodType<Prisma.ProductTypeFindUniqueArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    where: ProductTypeWhereUniqueInputSchema,
  })
  .strict();

export const ProductTypeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductTypeFindUniqueOrThrowArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    where: ProductTypeWhereUniqueInputSchema,
  })
  .strict();

export const ProductSiteFindFirstArgsSchema: z.ZodType<Prisma.ProductSiteFindFirstArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    where: ProductSiteWhereInputSchema.optional(),
    orderBy: z.union([ProductSiteOrderByWithRelationInputSchema.array(), ProductSiteOrderByWithRelationInputSchema]).optional(),
    cursor: ProductSiteWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductSiteScalarFieldEnumSchema, ProductSiteScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductSiteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductSiteFindFirstOrThrowArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    where: ProductSiteWhereInputSchema.optional(),
    orderBy: z.union([ProductSiteOrderByWithRelationInputSchema.array(), ProductSiteOrderByWithRelationInputSchema]).optional(),
    cursor: ProductSiteWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductSiteScalarFieldEnumSchema, ProductSiteScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductSiteFindManyArgsSchema: z.ZodType<Prisma.ProductSiteFindManyArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    where: ProductSiteWhereInputSchema.optional(),
    orderBy: z.union([ProductSiteOrderByWithRelationInputSchema.array(), ProductSiteOrderByWithRelationInputSchema]).optional(),
    cursor: ProductSiteWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([ProductSiteScalarFieldEnumSchema, ProductSiteScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const ProductSiteAggregateArgsSchema: z.ZodType<Prisma.ProductSiteAggregateArgs> = z
  .object({
    where: ProductSiteWhereInputSchema.optional(),
    orderBy: z.union([ProductSiteOrderByWithRelationInputSchema.array(), ProductSiteOrderByWithRelationInputSchema]).optional(),
    cursor: ProductSiteWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductSiteGroupByArgsSchema: z.ZodType<Prisma.ProductSiteGroupByArgs> = z
  .object({
    where: ProductSiteWhereInputSchema.optional(),
    orderBy: z.union([ProductSiteOrderByWithAggregationInputSchema.array(), ProductSiteOrderByWithAggregationInputSchema]).optional(),
    by: ProductSiteScalarFieldEnumSchema.array(),
    having: ProductSiteScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ProductSiteFindUniqueArgsSchema: z.ZodType<Prisma.ProductSiteFindUniqueArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    where: ProductSiteWhereUniqueInputSchema,
  })
  .strict();

export const ProductSiteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductSiteFindUniqueOrThrowArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    where: ProductSiteWhereUniqueInputSchema,
  })
  .strict();

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    data: z.union([ProductCreateInputSchema, ProductUncheckedCreateInputSchema]),
  })
  .strict();

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereUniqueInputSchema,
    create: z.union([ProductCreateInputSchema, ProductUncheckedCreateInputSchema]),
    update: z.union([ProductUpdateInputSchema, ProductUncheckedUpdateInputSchema]),
  })
  .strict();

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> = z
  .object({
    data: z.union([ProductCreateManyInputSchema, ProductCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductCreateManyAndReturnArgs> = z
  .object({
    data: z.union([ProductCreateManyInputSchema, ProductCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    where: ProductWhereUniqueInputSchema,
  })
  .strict();

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z
  .object({
    select: ProductSelectSchema.optional(),
    include: ProductIncludeSchema.optional(),
    data: z.union([ProductUpdateInputSchema, ProductUncheckedUpdateInputSchema]),
    where: ProductWhereUniqueInputSchema,
  })
  .strict();

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> = z
  .object({
    data: z.union([ProductUpdateManyMutationInputSchema, ProductUncheckedUpdateManyInputSchema]),
    where: ProductWhereInputSchema.optional(),
  })
  .strict();

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> = z
  .object({
    where: ProductWhereInputSchema.optional(),
  })
  .strict();

export const ProductNutrition100gCreateArgsSchema: z.ZodType<Prisma.ProductNutrition100gCreateArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    data: z.union([ProductNutrition100gCreateInputSchema, ProductNutrition100gUncheckedCreateInputSchema]),
  })
  .strict();

export const ProductNutrition100gUpsertArgsSchema: z.ZodType<Prisma.ProductNutrition100gUpsertArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    where: ProductNutrition100gWhereUniqueInputSchema,
    create: z.union([ProductNutrition100gCreateInputSchema, ProductNutrition100gUncheckedCreateInputSchema]),
    update: z.union([ProductNutrition100gUpdateInputSchema, ProductNutrition100gUncheckedUpdateInputSchema]),
  })
  .strict();

export const ProductNutrition100gCreateManyArgsSchema: z.ZodType<Prisma.ProductNutrition100gCreateManyArgs> = z
  .object({
    data: z.union([ProductNutrition100gCreateManyInputSchema, ProductNutrition100gCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductNutrition100gCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductNutrition100gCreateManyAndReturnArgs> = z
  .object({
    data: z.union([ProductNutrition100gCreateManyInputSchema, ProductNutrition100gCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductNutrition100gDeleteArgsSchema: z.ZodType<Prisma.ProductNutrition100gDeleteArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    where: ProductNutrition100gWhereUniqueInputSchema,
  })
  .strict();

export const ProductNutrition100gUpdateArgsSchema: z.ZodType<Prisma.ProductNutrition100gUpdateArgs> = z
  .object({
    select: ProductNutrition100gSelectSchema.optional(),
    include: ProductNutrition100gIncludeSchema.optional(),
    data: z.union([ProductNutrition100gUpdateInputSchema, ProductNutrition100gUncheckedUpdateInputSchema]),
    where: ProductNutrition100gWhereUniqueInputSchema,
  })
  .strict();

export const ProductNutrition100gUpdateManyArgsSchema: z.ZodType<Prisma.ProductNutrition100gUpdateManyArgs> = z
  .object({
    data: z.union([ProductNutrition100gUpdateManyMutationInputSchema, ProductNutrition100gUncheckedUpdateManyInputSchema]),
    where: ProductNutrition100gWhereInputSchema.optional(),
  })
  .strict();

export const ProductNutrition100gDeleteManyArgsSchema: z.ZodType<Prisma.ProductNutrition100gDeleteManyArgs> = z
  .object({
    where: ProductNutrition100gWhereInputSchema.optional(),
  })
  .strict();

export const ProductNutritionTotalCreateArgsSchema: z.ZodType<Prisma.ProductNutritionTotalCreateArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    data: z.union([ProductNutritionTotalCreateInputSchema, ProductNutritionTotalUncheckedCreateInputSchema]),
  })
  .strict();

export const ProductNutritionTotalUpsertArgsSchema: z.ZodType<Prisma.ProductNutritionTotalUpsertArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    where: ProductNutritionTotalWhereUniqueInputSchema,
    create: z.union([ProductNutritionTotalCreateInputSchema, ProductNutritionTotalUncheckedCreateInputSchema]),
    update: z.union([ProductNutritionTotalUpdateInputSchema, ProductNutritionTotalUncheckedUpdateInputSchema]),
  })
  .strict();

export const ProductNutritionTotalCreateManyArgsSchema: z.ZodType<Prisma.ProductNutritionTotalCreateManyArgs> = z
  .object({
    data: z.union([ProductNutritionTotalCreateManyInputSchema, ProductNutritionTotalCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductNutritionTotalCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductNutritionTotalCreateManyAndReturnArgs> = z
  .object({
    data: z.union([ProductNutritionTotalCreateManyInputSchema, ProductNutritionTotalCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductNutritionTotalDeleteArgsSchema: z.ZodType<Prisma.ProductNutritionTotalDeleteArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    where: ProductNutritionTotalWhereUniqueInputSchema,
  })
  .strict();

export const ProductNutritionTotalUpdateArgsSchema: z.ZodType<Prisma.ProductNutritionTotalUpdateArgs> = z
  .object({
    select: ProductNutritionTotalSelectSchema.optional(),
    include: ProductNutritionTotalIncludeSchema.optional(),
    data: z.union([ProductNutritionTotalUpdateInputSchema, ProductNutritionTotalUncheckedUpdateInputSchema]),
    where: ProductNutritionTotalWhereUniqueInputSchema,
  })
  .strict();

export const ProductNutritionTotalUpdateManyArgsSchema: z.ZodType<Prisma.ProductNutritionTotalUpdateManyArgs> = z
  .object({
    data: z.union([ProductNutritionTotalUpdateManyMutationInputSchema, ProductNutritionTotalUncheckedUpdateManyInputSchema]),
    where: ProductNutritionTotalWhereInputSchema.optional(),
  })
  .strict();

export const ProductNutritionTotalDeleteManyArgsSchema: z.ZodType<Prisma.ProductNutritionTotalDeleteManyArgs> = z
  .object({
    where: ProductNutritionTotalWhereInputSchema.optional(),
  })
  .strict();

export const ProductTypeCreateArgsSchema: z.ZodType<Prisma.ProductTypeCreateArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    data: z.union([ProductTypeCreateInputSchema, ProductTypeUncheckedCreateInputSchema]),
  })
  .strict();

export const ProductTypeUpsertArgsSchema: z.ZodType<Prisma.ProductTypeUpsertArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    where: ProductTypeWhereUniqueInputSchema,
    create: z.union([ProductTypeCreateInputSchema, ProductTypeUncheckedCreateInputSchema]),
    update: z.union([ProductTypeUpdateInputSchema, ProductTypeUncheckedUpdateInputSchema]),
  })
  .strict();

export const ProductTypeCreateManyArgsSchema: z.ZodType<Prisma.ProductTypeCreateManyArgs> = z
  .object({
    data: z.union([ProductTypeCreateManyInputSchema, ProductTypeCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductTypeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductTypeCreateManyAndReturnArgs> = z
  .object({
    data: z.union([ProductTypeCreateManyInputSchema, ProductTypeCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductTypeDeleteArgsSchema: z.ZodType<Prisma.ProductTypeDeleteArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    where: ProductTypeWhereUniqueInputSchema,
  })
  .strict();

export const ProductTypeUpdateArgsSchema: z.ZodType<Prisma.ProductTypeUpdateArgs> = z
  .object({
    select: ProductTypeSelectSchema.optional(),
    include: ProductTypeIncludeSchema.optional(),
    data: z.union([ProductTypeUpdateInputSchema, ProductTypeUncheckedUpdateInputSchema]),
    where: ProductTypeWhereUniqueInputSchema,
  })
  .strict();

export const ProductTypeUpdateManyArgsSchema: z.ZodType<Prisma.ProductTypeUpdateManyArgs> = z
  .object({
    data: z.union([ProductTypeUpdateManyMutationInputSchema, ProductTypeUncheckedUpdateManyInputSchema]),
    where: ProductTypeWhereInputSchema.optional(),
  })
  .strict();

export const ProductTypeDeleteManyArgsSchema: z.ZodType<Prisma.ProductTypeDeleteManyArgs> = z
  .object({
    where: ProductTypeWhereInputSchema.optional(),
  })
  .strict();

export const ProductSiteCreateArgsSchema: z.ZodType<Prisma.ProductSiteCreateArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    data: z.union([ProductSiteCreateInputSchema, ProductSiteUncheckedCreateInputSchema]),
  })
  .strict();

export const ProductSiteUpsertArgsSchema: z.ZodType<Prisma.ProductSiteUpsertArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    where: ProductSiteWhereUniqueInputSchema,
    create: z.union([ProductSiteCreateInputSchema, ProductSiteUncheckedCreateInputSchema]),
    update: z.union([ProductSiteUpdateInputSchema, ProductSiteUncheckedUpdateInputSchema]),
  })
  .strict();

export const ProductSiteCreateManyArgsSchema: z.ZodType<Prisma.ProductSiteCreateManyArgs> = z
  .object({
    data: z.union([ProductSiteCreateManyInputSchema, ProductSiteCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductSiteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductSiteCreateManyAndReturnArgs> = z
  .object({
    data: z.union([ProductSiteCreateManyInputSchema, ProductSiteCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ProductSiteDeleteArgsSchema: z.ZodType<Prisma.ProductSiteDeleteArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    where: ProductSiteWhereUniqueInputSchema,
  })
  .strict();

export const ProductSiteUpdateArgsSchema: z.ZodType<Prisma.ProductSiteUpdateArgs> = z
  .object({
    select: ProductSiteSelectSchema.optional(),
    include: ProductSiteIncludeSchema.optional(),
    data: z.union([ProductSiteUpdateInputSchema, ProductSiteUncheckedUpdateInputSchema]),
    where: ProductSiteWhereUniqueInputSchema,
  })
  .strict();

export const ProductSiteUpdateManyArgsSchema: z.ZodType<Prisma.ProductSiteUpdateManyArgs> = z
  .object({
    data: z.union([ProductSiteUpdateManyMutationInputSchema, ProductSiteUncheckedUpdateManyInputSchema]),
    where: ProductSiteWhereInputSchema.optional(),
  })
  .strict();

export const ProductSiteDeleteManyArgsSchema: z.ZodType<Prisma.ProductSiteDeleteManyArgs> = z
  .object({
    where: ProductSiteWhereInputSchema.optional(),
  })
  .strict();
