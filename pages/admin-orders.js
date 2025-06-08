import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import jwt_decode from "jwt-decode";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { role } = jwt_decode(token);
      if (role !== "admin") return;

      fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setOrders(data));
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Commandes – Admin</h1>
        {orders.length === 0 ? (
          <p>Aucune commande trouvée.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order, i) => (
              <li key={i} className="border p-4 rounded">
                <p className="font-semibold">Commande #{order._id}</p>
                <p>Utilisateur : {order.userId}</p>
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
