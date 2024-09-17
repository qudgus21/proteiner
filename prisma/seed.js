const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createNutritionEntries() {
  const nutrition100gPromises = [];
  const nutritionTotalPromises = [];

  for (let i = 0; i < 81; i++) {
    const nutrition100gData = {
      calories: getRandomValue(100, 500),
      carbohydrates: getRandomValue(100, 500),
      sugars: getRandomValue(100, 500),
      protein: getRandomValue(100, 500),
      fat: getRandomValue(100, 500),
      saturatedFat: getRandomValue(100, 500),
      transFat: getRandomValue(100, 500),
      cholesterol: getRandomValue(100, 500),
      sodium: getRandomValue(100, 500),
    };

    const nutritionTotalData = {
      calories: getRandomValue(100, 500),
      carbohydrates: getRandomValue(100, 500),
      sugars: getRandomValue(100, 500),
      protein: getRandomValue(100, 500),
      fat: getRandomValue(100, 500),
      saturatedFat: getRandomValue(100, 500),
      transFat: getRandomValue(100, 500),
      cholesterol: getRandomValue(100, 500),
      sodium: getRandomValue(100, 500),
    };

    nutrition100gPromises.push(prisma.productNutrition100g.create({ data: nutrition100gData }));
    nutritionTotalPromises.push(prisma.productNutritionTotal.create({ data: nutritionTotalData }));
  }

  const [nutrition100s, nutritionTotals] = await Promise.all([Promise.all(nutrition100gPromises), Promise.all(nutritionTotalPromises)]);

  return { nutrition100s, nutritionTotals };
}
async function main() {
  // 기존 데이터 삭제
  await prisma.product.deleteMany({});
  await prisma.productType.deleteMany({});
  await prisma.productSite.deleteMany({});
  await prisma.productNutrition100g.deleteMany({});
  await prisma.productNutritionTotal.deleteMany({});

  // Parent types 생성
  const [chicken, pork, beef] = await Promise.all([
    prisma.productType.create({ data: { name: "닭" } }),
    prisma.productType.create({ data: { name: "돼지" } }),
    prisma.productType.create({ data: { name: "소" } }),
  ]);

  // Subtypes 생성
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

  // Site 생성
  const [coopang, ranking, meetry] = await Promise.all([
    prisma.productSite.create({ data: { name: "쿠팡" } }),
    prisma.productSite.create({ data: { name: "랭킹달컴" } }),
    prisma.productSite.create({ data: { name: "미트리" } }),
  ]);

  // Nutrition entries 생성
  const { nutrition100s, nutritionTotals } = await createNutritionEntries();

  // Subtypes와 parent 정보를 포함하여 제품 생성
  const productPromises = [];

  for (const subtype of [...chickenSubtypes, ...porkSubtypes, ...beefSubtypes]) {
    // 부모 정보를 포함하여 서브타입을 재조회
    const fullSubtype = await prisma.productType.findUnique({
      where: { id: subtype.id },
      include: { parent: true },
    });

    for (let i = 1; i <= 3; i++) {
      productPromises.push(
        prisma.product.create({
          data: {
            name: `${fullSubtype.parent ? fullSubtype.parent.name : "Unknown Parent"} - ${fullSubtype.name} (${i})`,
            price: getRandomValue(10000, 50000),
            pricePer100g: getRandomValue(1000, 5000),
            productUrl: "https://www.coupang.com",
            affiliateUrl: "https://www.coupang.com",
            productTypeId: fullSubtype.id,
            siteId: coopang.id,
            nutrition100gId: nutrition100s.pop().id,
            nutritionTotalId: nutritionTotals.pop().id,
            imageUrl:
              "https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2882595627829337-dda8fe4b-040f-4d3a-9fc2-fa00a275ecf3.jpg",
          },
        })
      );
    }
  }

  await Promise.all(productPromises);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
