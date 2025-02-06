import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import Cart from "@/models/Cart";
import { getSessionUser } from "@/lib/getSessionUser";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const user = await getSessionUser(req);
    const { productId, name, price, quantity, size, color, image } = await req.json();

    const cart = await Cart.findOne({ userId: user.id });

    if (cart) {
      // Update existing cart
      const existingItem = cart.items.find((item: { productId: string }) => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, quantity, size, color, image });
      }
      await cart.save();
    } else {
      // Create new cart
      await Cart.create({
        userId: user.id,
        items: [{ productId, name, price, quantity, size, color, image }],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
