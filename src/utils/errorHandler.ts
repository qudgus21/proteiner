import createError from "http-errors";
import { NextResponse } from "next/server";

export function handleError(error: unknown) {
  const statusCode = error instanceof createError.HttpError ? error.status : 500;
  const message = error instanceof Error ? error.message : "An unexpected error occurred";

  return NextResponse.json({ error: message }, { status: statusCode });
}
