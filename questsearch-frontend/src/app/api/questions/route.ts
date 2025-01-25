import { serverDataFetch } from "@/proto/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title = "", category = "", page = 1, limit = 10 } = body;

    if (!title && !category) {
      return NextResponse.json(
        { error: "Either 'title' or 'category' must be provided." },
        { status: 400 }
      );
    }

    const responseData = await serverDataFetch(title, category, page, limit);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching questions.",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
