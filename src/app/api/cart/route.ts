import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import Cart from "@/models/Cart";
import { getSessionUser } from "@/lib/getSessionUser";

export async function GET(req: Request) {
  try {
    await connectMongo();
    const user = await getSessionUser(req);

    const cart = await Cart.findOne({ userId: user.id }).populate("items.productId");
    return NextResponse.json(cart || { userId: user.id, items: [] });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
