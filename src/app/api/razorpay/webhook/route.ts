
import { NextResponse } from "next/server";
import crypto from "crypto";
import Order from "@/models/Order";
import { connectToDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  const text = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(text);
  const digest = shasum.digest("hex");

  if (digest !== signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  const body = JSON.parse(text);

  if (body.event === "payment.captured") {
    const { order_id, id, amount, method } = body.payload.payment.entity;

    await connectToDb();

    await Order.findOneAndUpdate(
      { "paymentDetails.orderId": order_id },
      {
        "paymentDetails.paymentId": id,
        "paymentDetails.status": "paid",
        "paymentDetails.amount": amount / 100,
        "paymentDetails.method": method,
      }
    );
  }

  return NextResponse.json({ status: "ok" });
}
