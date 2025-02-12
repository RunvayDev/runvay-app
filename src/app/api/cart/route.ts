// app/api/cart/route.ts
import  {connectToDb} from '@/lib/mongodb';
 import { NextResponse } from 'next/server';
 import { auth} from "@/lib/auth";
 import Cart from '@/models/Cart';
 import User from '@/models/User';

export async function GET() {
  await connectToDb();
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json([]);
  
  const cart = await Cart.findOne({ userId: session.user.id });
  return NextResponse.json(cart?.items || []);
}

export async function POST(request: Request) {
  await connectToDb();
  const session = await auth();
  const { cartItems } = await request.json();
  
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await User.findOne({ email: session.user.email });

  const cart = await Cart.findOneAndUpdate(
    { userId: user._id },
    { $set: { items: cartItems } },
    { upsert: true, new: true }
  );
  
  return NextResponse.json(cartItems);
}