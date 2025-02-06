import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose";
import Cart from "@/models/Cart";
import { getSessionUser } from "@/lib/getSessionUser";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const user = await getSessionUser(req);
    const { items } = await req.json();

    await Cart.updateOne(
      { userId: user.id },
      { userId: user.id, items },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
