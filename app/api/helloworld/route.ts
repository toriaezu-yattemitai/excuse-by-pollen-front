import { NextRequest, NextResponse } from "next/server";

/**
 * モックAPI: Hello Worldエンドポイント
 * GET /api/helloworld
 */
export async function GET(_: NextRequest) {
  return NextResponse.json(
    {"message": "Hello World"},
    { status: 500 }
  );
}
