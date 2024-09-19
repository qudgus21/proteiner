import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import prisma from "@/lib/prisma";
import { handleError } from "@/utils/errorHandler";
import { idSchema, ProductCreateSchema, ProductUpdateSchema } from "@/schemas/product";
import { nutritionColumns } from "@/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const siteIds = searchParams.get("sites")?.split(",") || [];
  const typeIds = searchParams.get("types")?.split(",") || [];

  const nutritionTotalFilters: { [key: string]: { min?: number; max?: number } } = {};
  const nutrition100gFilters: { [key: string]: { min?: number; max?: number } } = {};

  console.log("siteIds", siteIds);

  // 전체 영양성분 필터 파싱
  Object.keys(nutritionColumns).forEach((key) => {
    const minKey = `nutritionTotal_${key}_min`;
    const maxKey = `nutritionTotal_${key}_max`;

    const min = searchParams.get(minKey);
    const max = searchParams.get(maxKey);

    if (min || max) {
      nutritionTotalFilters[key] = { min: min ? Number(min) : undefined, max: max ? Number(max) : undefined };
    }
  });

  // 100g 영양성분 필터 파싱
  Object.keys(nutritionColumns).forEach((key) => {
    const minKey = `nutrition100_${key}_min`;
    const maxKey = `nutrition100_${key}_max`;

    const min = searchParams.get(minKey);
    const max = searchParams.get(maxKey);

    if (min || max) {
      nutrition100gFilters[key] = { min: min ? Number(min) : undefined, max: max ? Number(max) : undefined };
    }
  });

  try {
    // 조건별로 where 필터링을 추가합니다.
    const products = await prisma.product.findMany({
      where: {
        AND: [
          { siteId: { in: siteIds } },
          { productTypeId: { in: typeIds } },
          // Nutrition total filters
          // ...Object.entries(nutritionTotalFilters).flatMap(([key, { min, max }]) => {
          //   const conditions = [];
          //   if (min !== undefined) conditions.push({ [key]: { gte: min } });
          //   if (max !== undefined) conditions.push({ [key]: { lte: max } });
          //   return conditions.length > 0 ? { OR: conditions } : [];
          // }),
          // // Nutrition 100g filters
          // ...Object.entries(nutrition100gFilters).flatMap(([key, { min, max }]) => {
          //   const conditions = [];
          //   if (min !== undefined) conditions.push({ pricePer100g: { gte: min } });
          //   if (max !== undefined) conditions.push({ pricePer100g: { lte: max } });
          //   return conditions.length > 0 ? { OR: conditions } : [];
          // }),
        ].filter(Boolean),
      },
    });

    console.log(products, "products");

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products with filters:", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductCreateSchema.parse(body);

    const newProduct = await prisma.product.create({
      data: {
        id: uuidv4(),
        ...parsedBody,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductUpdateSchema.parse(body);

    const updatedProduct = await prisma.product.update({
      where: { id: parsedBody.id },
      data: parsedBody,
    });

    return NextResponse.json(updatedProduct);
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

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
