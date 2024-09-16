import { NextResponse } from "next/server";
import { ZodSchema } from "zod";
import getPrismaClient from "@/lib/prisma";

// 공통 API 핸들러 옵션 인터페이스
interface ApiHandlerOptions<T> {
  schema?: ZodSchema<T>; //데이터 정합성 판별
  model: string; //업데이트 할 모델
  idField?: string; // id 필드 이름 (기본값: 'id')
}

// 데이터 유효성 검사 함수
function validateData<T>(schema: ZodSchema<T>, data: unknown) {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    return { success: false, errors: (error as any).errors };
  }
}

// CREATE 요청 핸들러
export async function create<T>({ schema, model }: ApiHandlerOptions<T>, req: Request) {
  let data: unknown = await req.json();

  if (schema) {
    const validation = validateData(schema, data);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input data", details: validation.errors }, { status: 400 });
    }
    data = validation.data;
  }

  try {
    const prisma = getPrismaClient();
    const result = await (prisma as any)[model].create({ data });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to handle CREATE request:", error);
    return NextResponse.json({ error: "Failed to handle request" }, { status: 500 });
  }
}

// SHOW 요청 핸들러
export async function show<T>({ model, idField = "id" }: ApiHandlerOptions<T>, req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    const prisma = getPrismaClient();
    const result = await (prisma as any)[model].findUnique({ where: { [idField]: id } });
    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to handle SHOW request:", error);
    return NextResponse.json({ error: "Failed to handle request" }, { status: 500 });
  }
}

// UPDATE 요청 핸들러
export async function update<T>({ schema, model, idField = "id" }: ApiHandlerOptions<T>, req: Request) {
  let data: unknown = await req.json();

  if (schema) {
    const validation = validateData(schema, data);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input data", details: validation.errors }, { status: 400 });
    }
    data = validation.data;
  }

  try {
    const prisma = getPrismaClient();
    const { [idField]: id, ...updateData } = data as any;
    const result = await (prisma as any)[model].update({
      where: { [idField]: id },
      data: updateData,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to handle UPDATE request:", error);
    return NextResponse.json({ error: "Failed to handle request" }, { status: 500 });
  }
}

// REMOVE 요청 핸들러
export async function remove({ model, idField = "id" }: ApiHandlerOptions<{}>, req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    const prisma = getPrismaClient();
    await (prisma as any)[model].delete({ where: { [idField]: id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Failed to handle REMOVE request:", error);
    return NextResponse.json({ error: "Failed to handle request" }, { status: 500 });
  }
}
