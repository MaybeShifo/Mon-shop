import { connectDB } from "@/lib/db";
import Order from '../../../models/Order'
import { verifyToken } from '../../../lib/auth'




export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { items, total } = req.body;
      const user = verifyToken(req);
      const order = await Order.create({ userId: user.userId, items, total });
      res.status(201).json(order);
    } catch (err) {
      res.status(401).json({ message: "Non autorisé", error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const user = verifyToken(req);
      const orders = await Order.find({ userId: user.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(401).json({ message: "Erreur d'accès", error: err.message });
    }
  }

  res.status(405).end();
}
