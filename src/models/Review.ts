// src/models/Review.ts
import mongoose, { Schema, Document } from "mongoose";

interface Review extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<Review>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Review =
  mongoose.models.Review || mongoose.model<Review>("Review", ReviewSchema);
export default Review;
