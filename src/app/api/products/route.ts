import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import prisma from "@/lib/prisma";
import { handleError } from "@/utils/errorHandler";
import { idSchema, ProductCreateSchema, ProductUpdateSchema } from "@/schemas/product";
import { nutritionColumns, nutritionMapping } from "@/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const queryIsEmpty = !searchParams.toString();

  const siteIds = searchParams.get("sites")?.split(",") || [];
  const typeIds = searchParams.get("types")?.split(",") || [];
  const nameFilter = searchParams.get("name") || "";

  const nutritionTotalFilters: { [key: string]: { min?: number; max?: number } } = {};
  const nutrition100gFilters: { [key: string]: { min?: number; max?: number } } = {};

  // 전체 영양성분 필터 파싱
  nutritionColumns.forEach((key: (typeof nutritionColumns)[number]) => {
    const minKey = `nutritionTotal_${key}_min`;
    const maxKey = `nutritionTotal_${key}_max`;

    const min = searchParams.get(minKey);
    const max = searchParams.get(maxKey);

    if (min || max) {
      nutritionTotalFilters[nutritionMapping[key]] = { min: min ? Number(min) : undefined, max: max ? Number(max) : undefined };
    }
  });

  //100g 영양성분 필터 파싱
  nutritionColumns.forEach((key: (typeof nutritionColumns)[number]) => {
    const minKey = `nutrition100_${key}_min`;
    const maxKey = `nutrition100_${key}_max`;

    const min = searchParams.get(minKey);
    const max = searchParams.get(maxKey);

    if (min || max) {
      nutrition100gFilters[nutritionMapping[key]] = { min: min ? Number(min) : undefined, max: max ? Number(max) : undefined };
    }
  });

  const andItems = [];

  andItems.push({ siteId: { in: siteIds.length > 0 ? siteIds : [] } }, { productTypeId: { in: typeIds.length > 0 ? typeIds : [] } });

  if (nameFilter) {
    andItems.push({
      name: {
        contains: nameFilter,
        mode: "insensitive",
      },
    });
  }

  // 전체 영양성분 필터 적용
  Object.entries(nutritionTotalFilters).forEach(([key, { min, max }]) => {
    if (min !== undefined) {
      andItems.push({
        nutritionTotal: {
          [key]: { gte: min },
        },
      });
    }
    if (max !== undefined) {
      andItems.push({
        nutritionTotal: {
          [key]: { lte: max },
        },
      });
    }
  });

  // 100g당 영양성분 필터 적용
  Object.entries(nutrition100gFilters).forEach(([key, { min, max }]) => {
    if (min !== undefined) {
      andItems.push({
        nutrition100g: {
          [key]: { gte: min },
        },
      });
    }
    if (max !== undefined) {
      andItems.push({
        nutrition100g: {
          [key]: { lte: max },
        },
      });
    }
  });

  try {
    const products = await prisma.product.findMany({
      where: queryIsEmpty ? {} : { AND: andItems.filter(Boolean) },
    });
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
