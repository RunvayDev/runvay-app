import mongoose, { Schema, Document, Types } from "mongoose";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  slug: string;
  image: string;
}

interface Cart extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, required: true },
    color: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false } // Prevents creating an extra _id for each cart item
);

const cartSchema = new Schema<Cart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model<Cart>("Cart", cartSchema);

export default Cart;
