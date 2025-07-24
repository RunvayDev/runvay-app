import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/mongodb";
import Order from "@/models/Order";
import { auth } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    await connectToDb();
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { razorpayOrderId } = await req.json();
    const { orderId } = await context.params;

    if (!razorpayOrderId) {
      return NextResponse.json(
        { message: "Razorpay Order ID is required" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { "paymentDetails.orderId": razorpayOrderId },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Order update error:", err);
      return NextResponse.json(
        { message: "Failed to update order" },
        { status: 500 }
      );
    }
  }
}
