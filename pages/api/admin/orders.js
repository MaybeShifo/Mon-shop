import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/auth";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      requireAdmin(req);
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (err) {
      res.status(403).json({ message: "Accès interdit", error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
