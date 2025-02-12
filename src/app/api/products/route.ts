import { NextResponse, NextRequest } from "next/server";
import Product from "@/models/Product";
import {connectToDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  await connectToDb();

  const { text } = await req.json();

  console.log("Received text:", text);

  try {
    const newProduct = new Product({
      item: text,
    });

    await newProduct.save();

    return NextResponse.json({
      message: "Product saved successfully",
      product: newProduct,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error saving product:", error);

      return NextResponse.json(
        { message: "Error saving product", error: error.message },
        { status: 500 },
      );
    }
  }
}
