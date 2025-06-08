import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
