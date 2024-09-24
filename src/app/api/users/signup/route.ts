import { NextResponse } from "next/server";
import { prisma, firebaseAdmin } from "@/libs";
import { UserOnlyRequiredSchema } from "@/schemas/user";
import { handleError } from "@/utils/errorHandler";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = UserOnlyRequiredSchema.parse(body);

    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
    });

    const user = await prisma.user.create({
      data: {
        firebaseUid: userRecord.uid,
        email,
        role: "USER",
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    return handleError(error);
  }
}
