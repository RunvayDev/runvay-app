import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    size: [String],
    color: [String],
    images: [String],
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
