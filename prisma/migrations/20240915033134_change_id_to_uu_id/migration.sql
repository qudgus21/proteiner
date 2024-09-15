/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductNutrition100g` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductNutritionTotal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductSite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_nutrition100gId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_nutritionTotalId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_siteId_fkey";

-- DropForeignKey
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_parentId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productTypeId" SET DATA TYPE TEXT,
ALTER COLUMN "siteId" SET DATA TYPE TEXT,
ALTER COLUMN "nutrition100gId" SET DATA TYPE TEXT,
ALTER COLUMN "nutritionTotalId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "ProductNutrition100g" DROP CONSTRAINT "ProductNutrition100g_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductNutrition100g_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductNutrition100g_id_seq";

-- AlterTable
ALTER TABLE "ProductNutritionTotal" DROP CONSTRAINT "ProductNutritionTotal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductNutritionTotal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductNutritionTotal_id_seq";

-- AlterTable
ALTER TABLE "ProductSite" DROP CONSTRAINT "ProductSite_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductSite_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductSite_id_seq";

-- AlterTable
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductType_id_seq";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "ProductSite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_nutrition100gId_fkey" FOREIGN KEY ("nutrition100gId") REFERENCES "ProductNutrition100g"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_nutritionTotalId_fkey" FOREIGN KEY ("nutritionTotalId") REFERENCES "ProductNutritionTotal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductType" ADD CONSTRAINT "ProductType_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
