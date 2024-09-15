const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.product.deleteMany({});
  await prisma.productType.deleteMany({});
  await prisma.productSite.deleteMany({});
  await prisma.productNutrition100g.deleteMany({});
  await prisma.productNutritionTotal.deleteMany({});

  //parant type 생성
  const [chicken, pork, duck, beef] = await Promise.all([
    prisma.productType.create({ data: { name: "닭" } }),
    prisma.productType.create({ data: { name: "돼지" } }),
    prisma.productType.create({ data: { name: "소" } }),
    prisma.productType.create({ data: { name: "오리" } }),
  ]);

  //sub type 생성
  const chickenSubtypes = await Promise.all([
    prisma.productType.create({ data: { name: "생닭", parentId: chicken.id } }),
    prisma.productType.create({ data: { name: "닭다리", parentId: chicken.id } }),
    prisma.productType.create({ data: { name: "닭가슴살", parentId: chicken.id } }),
    prisma.productType.create({ data: { name: "닭발", parentId: chicken.id } }),
    prisma.productType.create({ data: { name: "닭안심", parentId: chicken.id } }),
    prisma.productType.create({ data: { name: "닭날개 / 봉", parentId: chicken.id } }),
    prisma.productType.create({ data: { name: "닭근위 (모래집)", parentId: chicken.id } }),
    prisma.productType.create({ data: { name: "닭목", parentId: chicken.id } }),
    prisma.productType.create({ data: { name: "기타", parentId: chicken.id } }),
  ]);

  const porkSubtypes = await Promise.all([
    prisma.productType.create({ data: { name: "삼겹살", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "앞다리살 / 뒷다리살", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "목살", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "등심", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "안심", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "갈비", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "항정살", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "오겹살", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "갈매기살", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "등갈비 / 등뼈", parentId: pork.id } }),
    prisma.productType.create({ data: { name: "기타", parentId: pork.id } }),
  ]);

  const beefSubtypes = await Promise.all([
    prisma.productType.create({ data: { name: "생소고기", parentId: beef.id } }),
    prisma.productType.create({ data: { name: "등심", parentId: beef.id } }),
    prisma.productType.create({ data: { name: "안심", parentId: beef.id } }),
    prisma.productType.create({ data: { name: "갈비", parentId: beef.id } }),
    prisma.productType.create({ data: { name: "차돌박이", parentId: beef.id } }),
    prisma.productType.create({ data: { name: "육포", parentId: beef.id } }),
    prisma.productType.create({ data: { name: "기타", parentId: beef.id } }),
  ]);

  const duckSubtypes = await Promise.all([
    prisma.productType.create({ data: { name: "생오리", parentId: duck.id } }),
    prisma.productType.create({ data: { name: "오리 가슴살", parentId: duck.id } }),
    prisma.productType.create({ data: { name: "오리 다리살", parentId: duck.id } }),
    prisma.productType.create({ data: { name: "오리 가공품 (훈제 오리 등)", parentId: duck.id } }),
  ]);

  const [coopang, ranking, meetry] = await Promise.all([
    prisma.productSite.create({ data: { name: "쿠팡" } }),
    prisma.productSite.create({ data: { name: "랭킹달컴" } }),
    prisma.productSite.create({ data: { name: "미트리" } }),
  ]);

  await prisma.productNutritionTotal.createMany({
    data: [
      {
        calories: 500,
        carbohydrates: 60,
        sugars: 20,
        protein: 40,
        fat: 10,
        saturatedFat: 4,
        transFat: 0,
        cholesterol: 0,
        sodium: 100,
      },
    ],
  });

  const nutrition100s = await Promise.all([
    prisma.productNutrition100g.create({
      data: {
        calories: 1100,
        carbohydrates: 1100,
        sugars: 1100,
        protein: 1100,
        fat: 1100,
        saturatedFat: 1100,
        transFat: 1100,
        cholesterol: 1100,
        sodium: 1100,
      },
    }),
    prisma.productNutrition100g.create({
      data: {
        calories: 2100,
        carbohydrates: 2100,
        sugars: 2100,
        protein: 2100,
        fat: 2100,
        saturatedFat: 2100,
        transFat: 2100,
        cholesterol: 2100,
        sodium: 2100,
      },
    }),
    prisma.productNutrition100g.create({
      data: {
        calories: 3100,
        carbohydrates: 3100,
        sugars: 3100,
        protein: 3100,
        fat: 3100,
        saturatedFat: 3100,
        transFat: 3100,
        cholesterol: 3100,
        sodium: 3100,
      },
    }),
  ]);

  const nutritionTotals = await Promise.all([
    prisma.productNutritionTotal.create({
      data: {
        calories: 1100,
        carbohydrates: 1100,
        sugars: 1100,
        protein: 1100,
        fat: 1100,
        saturatedFat: 1100,
        transFat: 1100,
        cholesterol: 1100,
        sodium: 1100,
      },
    }),
    prisma.productNutritionTotal.create({
      data: {
        calories: 2100,
        carbohydrates: 2100,
        sugars: 2100,
        protein: 2100,
        fat: 2100,
        saturatedFat: 2100,
        transFat: 2100,
        cholesterol: 2100,
        sodium: 2100,
      },
    }),
    prisma.productNutritionTotal.create({
      data: {
        calories: 3100,
        carbohydrates: 3100,
        sugars: 3100,
        protein: 3100,
        fat: 3100,
        saturatedFat: 3100,
        transFat: 3100,
        cholesterol: 3100,
        sodium: 3100,
      },
    }),
  ]);

  await prisma.product.createMany({
    data: [
      {
        name: "Protein Powder",
        price: 30000,
        pricePer100g: 3000,
        productUrl: "https://example.com/product1",
        affiliateUrl: "https://affiliate.example.com/product1",
        productTypeId: chickenSubtypes[0].id,
        siteId: coopang.id,
        nutrition100gId: nutrition100s[0].id,
        nutritionTotalId: nutritionTotals[0].id,
      },
      {
        name: "Protein Powder",
        price: 30000,
        pricePer100g: 3000,
        productUrl: "https://example.com/product1",
        affiliateUrl: "https://affiliate.example.com/product1",
        productTypeId: beefSubtypes[0].id,
        siteId: ranking.id,
        nutrition100gId: nutrition100s[1].id,
        nutritionTotalId: nutritionTotals[1].id,
      },
      {
        name: "Protein Powder",
        price: 30000,
        pricePer100g: 3000,
        productUrl: "https://example.com/product1",
        affiliateUrl: "https://affiliate.example.com/product1",
        productTypeId: duckSubtypes[0].id,
        siteId: meetry.id,
        nutrition100gId: nutrition100s[2].id,
        nutritionTotalId: nutritionTotals[2].id,
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
