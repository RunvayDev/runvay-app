import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

interface Cart extends Document {
  userId: string;
  items: CartItem[];
}

const CartSchema = new Schema<Cart>(
  {
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model<Cart>("Cart", CartSchema);

export default Cart;
