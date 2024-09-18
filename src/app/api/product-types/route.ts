import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";
import prisma from "@/lib/prisma";
import { handleError } from "@/utils/errorHandler";
import { idSchema, ProductTypeCreateSchema, ProductTypeUpdateSchema, ProductTypeWithChildrenSchema } from "@/types/schema";

//todo: default로 parent만 주기 => search 옵션으로 변경
export async function GET() {
  try {
    const productTypes = await prisma.productType.findMany({
      where: {
        parentId: null, // parentId가 null인 요소만 필터링
      },
      include: {
        children: true, // 자식 데이터도 포함
      },
    });

    //검증
    const parsedData = ProductTypeWithChildrenSchema.array().parse(productTypes);
    return NextResponse.json(parsedData);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductTypeCreateSchema.parse(body);

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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductTypeUpdateSchema.parse(body);

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

    if (!id || !idSchema.safeParse(id).success) {
      throw createHttpError.BadRequest("Invalid or missing ID");
    }

    await prisma.productType.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product Type deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}
