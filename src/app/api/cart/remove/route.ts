import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import Cart from "@/models/Cart";
import { getSessionUser } from "@/lib/getSessionUser";

export async function DELETE(req: Request) {
  try {
    await connectMongo();
    const user = await getSessionUser(req);
    const { productId } = await req.json();

    const cart = await Cart.findOne({ userId: user.id });
    if (cart) {
      cart.items = cart.items.filter((item: { productId: string }) => item.productId.toString() !== productId);
      await cart.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
