export {};
// import { NextResponse } from "next/server";
// import getPrismaClient from "@/lib/prisma";

// export async function GET() {
//   const prisma = getPrismaClient();

//   try {
//     const products = await prisma.product.findMany({
//       include: {
//         productType: true,
//         site: true,
//         nutrition100g: true,
//         nutritionTotal: true,
//       },
//     });
//     return NextResponse.json(products);
//   } catch (error) {
//     return NextResponse.error();
//   }
// }

// export async function POST(req: Request) {
//   const prisma = getPrismaClient();
//   const data = await req.json();

//   try {
//     const newProduct = await prisma.product.create({
//       data,
//     });
//     return NextResponse.json(newProduct);
//   } catch (error) {
//     return NextResponse.error();
//   }
// }
