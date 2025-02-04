import mongoose, { Document } from "mongoose";

interface Profile extends Document {
  user: { type: mongoose.Schema.Types.ObjectId; ref: "User"; required: true };
  email: { type: string };
  phoneNumber: { type: string; required: true };
  shippingAddress: {
    street: { type: string };
    city: { type: string };
    zip: { type: string };
    country: { type: string };
  };
  orders: mongoose.Types.ObjectId[];
}

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    zip: { type: String },
    country: { type: String },
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;
