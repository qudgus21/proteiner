-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_nutrition100gId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_nutritionTotalId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_nutrition100gId_fkey" FOREIGN KEY ("nutrition100gId") REFERENCES "ProductNutrition100g"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_nutritionTotalId_fkey" FOREIGN KEY ("nutritionTotalId") REFERENCES "ProductNutritionTotal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
