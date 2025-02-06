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

export async function GET(request: Request) {
  // Add GET handler
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
