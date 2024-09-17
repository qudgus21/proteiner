import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import prisma from "@/lib/prisma";
import { handleError } from "@/utils/errorHandler";
import { ProductNutritionTotalCreateInputSchema, ProductNutritionTotalSchema } from "@/types/schema";

export async function GET() {
  try {
    const productNutritions = await prisma.productNutritionTotal.findMany();
    return NextResponse.json(productNutritions);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductNutritionTotalCreateInputSchema.parse(body);

    const newProductNutrition = await prisma.productNutritionTotal.create({
      data: {
        id: uuidv4(),
        ...parsedBody,
      },
    });

    return NextResponse.json(newProductNutrition, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductNutritionTotalSchema.parse(body);

    const updatedProductNutrition = await prisma.productNutritionTotal.update({
      where: { id: parsedBody.id },
      data: parsedBody,
    });

    return NextResponse.json(updatedProductNutrition);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      throw createHttpError.BadRequest();
    }

    await prisma.productNutritionTotal.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product nutrition total deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
