-- AlterTable
ALTER TABLE "ProductNutrition100g" ALTER COLUMN "calories" DROP NOT NULL,
ALTER COLUMN "carbohydrates" DROP NOT NULL,
ALTER COLUMN "sugars" DROP NOT NULL,
ALTER COLUMN "protein" DROP NOT NULL,
ALTER COLUMN "fat" DROP NOT NULL,
ALTER COLUMN "saturatedFat" DROP NOT NULL,
ALTER COLUMN "transFat" DROP NOT NULL,
ALTER COLUMN "cholesterol" DROP NOT NULL,
ALTER COLUMN "sodium" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductNutritionTotal" ALTER COLUMN "calories" DROP NOT NULL,
ALTER COLUMN "carbohydrates" DROP NOT NULL,
ALTER COLUMN "sugars" DROP NOT NULL,
ALTER COLUMN "protein" DROP NOT NULL,
ALTER COLUMN "fat" DROP NOT NULL,
ALTER COLUMN "saturatedFat" DROP NOT NULL,
ALTER COLUMN "transFat" DROP NOT NULL,
ALTER COLUMN "cholesterol" DROP NOT NULL,
ALTER COLUMN "sodium" DROP NOT NULL;
