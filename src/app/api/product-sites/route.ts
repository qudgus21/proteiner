import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ProductSiteSchema } from "@/types/schema";

export async function GET() {
  try {
    const productSites = await prisma.productSite.findMany();
    return NextResponse.json(productSites);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product sites" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductSiteSchema.parse(body);

    const newProductSite = await prisma.productSite.create({
      data: parsedBody,
    });

    return NextResponse.json(newProductSite, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product site" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = ProductSiteSchema.parse(body);

    const updatedProductSite = await prisma.productSite.update({
      where: { id: parsedBody.id },
      data: parsedBody,
    });

    return NextResponse.json(updatedProductSite);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product site" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.productSite.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product site deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product site" }, { status: 400 });
  }
}
