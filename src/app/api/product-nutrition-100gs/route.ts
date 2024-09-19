import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import prisma from "@/lib/prisma";
import { handleError } from "@/utils/errorHandler";
import { idSchema, ProductNutrition100gCreateSchema, ProductNutrition100gUpdateSchema } from "@/schemas/productNutrition100g";

export async function GET() {
  try {
    const nutrition100gs = await prisma.productNutrition100g.findMany();
    return NextResponse.json(nutrition100gs);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductNutrition100gCreateSchema.parse(body);

    const newNutrition100g = await prisma.productNutrition100g.create({
      data: {
        id: uuidv4(),
        ...parsedBody,
      },
    });

    return NextResponse.json(newNutrition100g, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductNutrition100gUpdateSchema.parse(body);

    const updatedNutrition100g = await prisma.productNutrition100g.update({
      where: { id: parsedBody.id },
      data: parsedBody,
    });

    return NextResponse.json(updatedNutrition100g);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id || !idSchema.safeParse(id).success) {
      throw createHttpError.BadRequest("Invalid or missing ID");
    }

    await prisma.productNutrition100g.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product Nutrition 100g deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
