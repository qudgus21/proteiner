import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs";
import { handleError } from "@/utils/errorHandler";
import { idSchema, ProductCreateSchema, ProductUpdateSchema } from "@/schemas/product";
import { nutritionColumns, nutritionMapping } from "@/constants";

type NutritionFilter = {
  min?: number;
  max?: number;
};

type Filters = {
  siteIds: string[];
  typeIds: string[];
  nameFilter: string;
  nutritionTotalFilters: { [key: string]: NutritionFilter };
  nutrition100gFilters: { [key: string]: NutritionFilter };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");

  // 단일 상품 조회 함수
  const fetchProductById = async (id: string) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          nutritionTotal: true, // 전체 영양성분 정보 포함
          nutrition100g: true, // 100g당 영양성분 정보 포함
        },
      });
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
    }
  };

  // 필터 파싱 함수
  const parseFilters = () => {
    const siteIds = searchParams.get("sites")?.split(",") || [];
    const typeIds = searchParams.get("types")?.split(",") || [];
    const nameFilter = searchParams.get("name") || "";

    const nutritionTotalFilters: { [key: string]: { min?: number; max?: number } } = {};
    const nutrition100gFilters: { [key: string]: { min?: number; max?: number } } = {};

    // 전체 영양성분 필터 파싱
    nutritionColumns.forEach((key) => {
      const minKey = `nutritionTotal_${key}_min`;
      const maxKey = `nutritionTotal_${key}_max`;

      const min = searchParams.get(minKey);
      const max = searchParams.get(maxKey);

      if (min || max) {
        nutritionTotalFilters[nutritionMapping[key]] = {
          min: min ? Number(min) : undefined,
          max: max ? Number(max) : undefined,
        };
      }
    });

    // 100g 영양성분 필터 파싱
    nutritionColumns.forEach((key) => {
      const minKey = `nutrition100_${key}_min`;
      const maxKey = `nutrition100_${key}_max`;

      const min = searchParams.get(minKey);
      const max = searchParams.get(maxKey);

      if (min || max) {
        nutrition100gFilters[nutritionMapping[key]] = {
          min: min ? Number(min) : undefined,
          max: max ? Number(max) : undefined,
        };
      }
    });

    return { siteIds, typeIds, nameFilter, nutritionTotalFilters, nutrition100gFilters };
  };

  // 필터 적용 함수
  const applyFilters = (filters: Filters) => {
    const andItems = [];
    const { siteIds, typeIds, nameFilter, nutritionTotalFilters, nutrition100gFilters } = filters;

    andItems.push({ siteId: { in: siteIds.length > 0 ? siteIds : [] } }, { productTypeId: { in: typeIds.length > 0 ? typeIds : [] } });

    if (nameFilter) {
      andItems.push({
        name: {
          contains: nameFilter,
          mode: Prisma.QueryMode.insensitive,
        },
      });
    }

    // 전체 영양성분 필터 적용
    Object.entries(nutritionTotalFilters).forEach(([key, { min, max }]) => {
      if (min !== undefined) {
        andItems.push({ nutritionTotal: { [key]: { gte: min } } });
      }
      if (max !== undefined) {
        andItems.push({ nutritionTotal: { [key]: { lte: max } } });
      }
    });

    // 100g당 영양성분 필터 적용
    Object.entries(nutrition100gFilters).forEach(([key, { min, max }]) => {
      if (min !== undefined) {
        andItems.push({ nutrition100g: { [key]: { gte: min } } });
      }
      if (max !== undefined) {
        andItems.push({ nutrition100g: { [key]: { lte: max } } });
      }
    });

    return andItems.filter(Boolean);
  };

  // ID가 있는 경우 단일 상품 조회
  if (productId) {
    return fetchProductById(productId);
  }

  // ID가 없는 경우 필터 파싱 및 적용
  const filters = parseFilters();
  const andItems = applyFilters(filters);
  const queryIsEmpty = !searchParams.toString();

  try {
    const products = await prisma.product.findMany({
      where: queryIsEmpty ? {} : { AND: andItems },
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
    const parsedBody: any = ProductCreateSchema.parse(body);

    // todo: 여기서 생성하면 안됨
    // 100g 영양정보를 생성
    const nutrition100g = await prisma.productNutrition100g.create({
      data: {
        id: uuidv4(),
        ...parsedBody.nutrition100g,
      },
    });

    // 전체 영양정보가 있는 경우 생성
    let nutritionTotal;
    if (parsedBody.nutritionTotal) {
      nutritionTotal = await prisma.productNutritionTotal.create({
        data: {
          id: uuidv4(),
          ...parsedBody.nutritionTotal,
        },
      });
    }

    // 상품 생성
    const newProduct = await prisma.product.create({
      data: {
        id: uuidv4(),
        name: parsedBody.name,
        price: parsedBody.price,
        pricePer100g: parsedBody.pricePer100g,
        productUrl: parsedBody.productUrl,
        affiliateUrl: parsedBody.affiliateUrl,
        imageUrl: parsedBody.imageUrl,
        productTypeId: parsedBody.productTypeId,
        siteId: parsedBody.siteId,
        nutrition100gId: nutrition100g.id,
        nutritionTotalId: nutritionTotal ? nutritionTotal.id : null,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductUpdateSchema.parse(body);

    const { id, ...data } = parsedBody;

    console.log(data);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
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
