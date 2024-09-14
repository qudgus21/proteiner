-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "pricePer100g" INTEGER,
    "productUrl" TEXT NOT NULL,
    "affiliateUrl" TEXT,
    "productTypeId" INTEGER NOT NULL,
    "siteId" INTEGER NOT NULL,
    "nutrition100gId" INTEGER,
    "nutritionTotalId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductNutrition100g" (
    "id" SERIAL NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "sugars" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "saturatedFat" DOUBLE PRECISION NOT NULL,
    "transFat" DOUBLE PRECISION NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "sodium" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductNutrition100g_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductNutritionTotal" (
    "id" SERIAL NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "sugars" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "saturatedFat" DOUBLE PRECISION NOT NULL,
    "transFat" DOUBLE PRECISION NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "sodium" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductNutritionTotal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSite" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductSite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_nutrition100gId_key" ON "Product"("nutrition100gId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_nutritionTotalId_key" ON "Product"("nutritionTotalId");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");

-- CreateIndex
CREATE INDEX "Product_pricePer100g_idx" ON "Product"("pricePer100g");

-- CreateIndex
CREATE INDEX "Product_productTypeId_idx" ON "Product"("productTypeId");

-- CreateIndex
CREATE INDEX "Product_siteId_idx" ON "Product"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_name_key" ON "ProductType"("name");

-- CreateIndex
CREATE INDEX "ProductType_parentId_idx" ON "ProductType"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSite_name_key" ON "ProductSite"("name");

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
