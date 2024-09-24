import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import { prisma } from "@/libs";
import { handleError } from "@/utils/errorHandler";
import { idSchema, ProductSiteCreateSchema, ProductSiteUpdateSchema } from "@/schemas/productSite";

export async function GET() {
  try {
    const productSites = await prisma.productSite.findMany();
    return NextResponse.json(productSites);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductSiteCreateSchema.parse(body);

    const newProductSite = await prisma.productSite.create({
      data: {
        id: uuidv4(),
        ...parsedBody,
      },
    });

    return NextResponse.json(newProductSite, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductSiteUpdateSchema.parse(body);

    const updatedProductSite = await prisma.productSite.update({
      where: { id: parsedBody.id },
      data: parsedBody,
    });

    return NextResponse.json(updatedProductSite);
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

    await prisma.productSite.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product site deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
