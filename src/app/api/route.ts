import { NextResponse, NextRequest } from "next/server";
import connectMongo from "../lib/mongoose";
import Product from "../models/Product";

export async function POST(req: NextRequest) {
  await connectMongo();

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
