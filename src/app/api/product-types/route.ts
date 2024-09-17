import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import prisma from "@/lib/prisma";
import { handleError } from "@/utils/errorHandler";
import { ProductTypeCreateInputSchema, ProductTypeSchema } from "@/types/schema";

export async function GET() {
  try {
    const productTypes = await prisma.productType.findMany();
    return NextResponse.json(productTypes);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductTypeCreateInputSchema.parse(body);

    const newProductType = await prisma.productType.create({
      data: {
        id: uuidv4(),
        ...parsedBody,
      },
    });

    return NextResponse.json(newProductType, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductTypeSchema.parse(body);

    const updatedProductType = await prisma.productType.update({
      where: { id: parsedBody.id },
      data: parsedBody,
    });

    return NextResponse.json(updatedProductType);
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

    await prisma.productType.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product type deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
