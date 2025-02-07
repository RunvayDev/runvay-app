// app/api/cart/route.ts
import  connectMongo  from '@/lib/mongoose';
 import { NextResponse } from 'next/server';
 import { auth} from "@/lib/auth";
 import User from '@/models/User';

export async function GET() {
  await connectMongo();
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json([]);
  
  const user = await User.findOne({ email: session.user.email });
  return NextResponse.json(user?.cart || []);
}

export async function POST(request: Request) {
  await connectMongo();
  const session = await auth();
  const { cartItems } = await request.json();
  
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  await User.updateOne(
    { email: session.user.email },
    { $set: { cart: cartItems } }
  );
  
  return NextResponse.json(cartItems);
}