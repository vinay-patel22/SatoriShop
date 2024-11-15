import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [String],
  rating: { type: Number, default: 0 },
});

export default mongoose.model("Product", productSchema);
