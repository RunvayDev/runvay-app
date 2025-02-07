// src/app/api/cart/[productId]/route.ts
import { NextResponse } from "next/server";
import { connectToDataBase } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import Cart from "@/models/Cart";

export async function PATCH(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();
    console.log(session);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quantity } = await request.json();
    await connectToDataBase();

    const updatedItem = await Cart.findOneAndUpdate(
      {
        userId: session.user.id,
        productId: params.productId,
      },
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error in PATCH /api/cart/[productId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDataBase();

    const deletedItem = await Cart.findOneAndDelete({
      userId: session.user.id,
      productId: params.productId,
    });

    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/cart/[productId]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}