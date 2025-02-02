// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import Review from "@/models/Review";

export async function POST(request: Request) {
  try {
    await connectMongo();

    const body = await request.json();
    const review = await Review.create(body);

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 },
    );
  }
}
