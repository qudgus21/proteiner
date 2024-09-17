import { NextResponse } from "next/server";
import createError from "http-errors";
import { ZodError } from "zod";

export function handleError(error: any) {
  let statusCode = 500;

  if (error instanceof createError.HttpError) {
    statusCode = error.status;
  } else if (error instanceof ZodError) {
    statusCode = 400;
  }

  return NextResponse.json({ error: error, message: error.message }, { status: statusCode });
}
