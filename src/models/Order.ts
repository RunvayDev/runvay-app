import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String },
        color: { type: String },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentDetails: {
      method: {
        type: String,
        enum: ["credit_card", "paypal", "cash_on_delivery"],
        required: true,
      },
      status: {
        type: String,
        enum: ["paid", "pending", "failed"],
        default: "pending",
      },
      transactionId: { type: String }, // Store transaction ID for online payments
    },
    trackingNumber: { type: String }, // Optional field for shipped orders
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
