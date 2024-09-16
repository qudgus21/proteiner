import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

//singleton
//서버리스로 올라가면 의미 없을수도 있겠지만
function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export default getPrismaClient;
