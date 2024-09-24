import { NextResponse } from "next/server";
import { firebaseAdmin } from "@/libs";
import { handleError } from "@/utils/errorHandler";
import { UserOnlyRequiredSchema } from "@/schemas/user";

export async function POST(request: Request) {
  try {
    const TOKEN_MAX_AGE = 60 * 60 * 24
    const body = await request.json();
    const { email, password } = UserOnlyRequiredSchema.parse(body);

    const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
    const customToken = await firebaseAdmin.auth().createCustomToken(userRecord.uid);

    const response = NextResponse.json({ token: customToken });
    response.cookies.set("proteiner_token", customToken, { httpOnly: true, secure: true, maxAge: TOKEN_MAX_AGE });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
