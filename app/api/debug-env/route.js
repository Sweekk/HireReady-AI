export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    PROJECT_ID: process.env.PROJECT_ID || null,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL || null,
    HAS_PRIVATE_KEY: !!process.env.PRIVATE_KEY,
    NODE_ENV: process.env.NODE_ENV,
  });
}
