import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const finalizeOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Vous devez être connecté pour commander.");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: cart, total: getTotal() }),
    });

    if (res.ok) {
      alert("Commande enregistrée !");
      setCart([]);
      localStorage.removeItem("cart");
    } else {
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Votre panier</h1>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center border-b pb-2">
                <span>{item.name}</span>
                <span>{item.price} DH</span>
                <button onClick={() => removeItem(idx)} className="text-red-600">Supprimer</button>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total : {getTotal()} DH</p>
          <button
            onClick={finalizeOrder}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            🛍 Finaliser la commande
          </button>
        </>
      )}
    </div>
  );
}
