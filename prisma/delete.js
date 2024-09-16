const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  await prisma.productType.deleteMany({});
  await prisma.productSite.deleteMany({});
  await prisma.productNutrition100g.deleteMany({});
  await prisma.productNutritionTotal.deleteMany({});
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
