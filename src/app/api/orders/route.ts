import { NextResponse } from "next/server";
import {connectToDb }from "@/lib/mongodb";
import Order from "@/models/Order";
import { auth } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { items, totalAmount, shippingAddress, paymentDetails } = await req.json();

    const order = new Order({
      user: user._id,
      items,
      totalAmount,
      shippingAddress,
      paymentDetails,
    });

    await order.save();

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Order creation error:", err);
      return NextResponse.json(
        { message: "Failed to create order" },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  try {
    await connectToDb();

    const session = await auth();

    if (!session) {
      console.log("no session")
      return NextResponse.json(
        { message: "Invalid or expired session" },
        { status: 401 },
      );
    }
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(user);

    const orders = await Order.find({ user: user._id })
      .populate("user", "name email")
      .populate("items.product", "name price images");

    // console.log(orders);

    return NextResponse.json(orders);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Order fetching error:", err);
      return NextResponse.json(
        { message: "Failed to fetch Orders" },
        { status: 500 },
      );
    }
  }
}
