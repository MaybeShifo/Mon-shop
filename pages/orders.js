import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Mes Commandes</h1>
        {orders.length === 0 ? (
          <p>Vous n'avez pas encore passé de commande.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order, i) => (
              <li key={i} className="border p-4 rounded">
                <p className="font-semibold">Commande #{order._id}</p>
                <p>Total : {order.total} MAD</p>
                <ul className="pl-4 mt-2 list-disc">
                  {order.items.map((item, j) => (
                    <li key={j}>
                      {item.name} — {item.quantity} × {item.price} MAD
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
