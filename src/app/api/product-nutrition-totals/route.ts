import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import prisma from "@/lib/prisma";
import { handleError } from "@/utils/errorHandler";
import { idSchema, ProductNutritionTotalCreateSchema, ProductNutritionTotalUpdateSchema } from "@/schemas/productNutritionTotal";

// 모든 제품 영양 정보 총합 조회
export async function GET() {
  try {
    const productNutritionTotals = await prisma.productNutritionTotal.findMany();
    return NextResponse.json(productNutritionTotals);
  } catch (error) {
    return handleError(error);
  }
}

// 제품 영양 정보 총합 생성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductNutritionTotalCreateSchema.parse(body);

    const newProductNutritionTotal = await prisma.productNutritionTotal.create({
      data: {
        id: uuidv4(),
        ...parsedBody,
      },
    });

    return NextResponse.json(newProductNutritionTotal, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// 제품 영양 정보 총합 업데이트
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const parsedBody = ProductNutritionTotalUpdateSchema.parse(body);

    const updatedProductNutritionTotal = await prisma.productNutritionTotal.update({
      where: { id: parsedBody.id },
      data: parsedBody,
    });

    return NextResponse.json(updatedProductNutritionTotal);
  } catch (error) {
    return handleError(error);
  }
}

// 제품 영양 정보 총합 삭제
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id || !idSchema.safeParse(id).success) {
      throw createHttpError.BadRequest("Invalid or missing ID");
    }

    await prisma.productNutritionTotal.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product nutrition total deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
