import mongoose from "mongoose";
import slugify from "slugify";

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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// Pre-save hook to generate slug from name if not provided
ProductSchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    // Generate a URL-friendly slug
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
