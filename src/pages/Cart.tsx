import { useCart } from "../context/cart-context";
import { useNavigate } from "react-router";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="py-12 page-container text-center">
        <h1 className="text-2xl font-semibold">Your Cart is Empty</h1>
        <p className="mt-2 text-gray-600">Add items to see them here.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-black text-white rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 page-container">
      <h1 className="mb-6 text-2xl font-bold">Cart</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
            >
              <img
                src={it.image}
                alt={it.title}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1">
                <p className="font-medium">{it.title}</p>
                <p className="text-gray-500">${it.price}</p>
              </div>
              <select
                aria-label="Quantity"
                className="px-2 py-1 border rounded"
                value={it.quantity}
                onChange={(e) => updateQty(it.id, Number(e.target.value))}
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <div className="w-24 text-right font-medium">
                ${(it.price * it.quantity).toFixed(2)}
              </div>
              <button
                className="px-3 py-1 text-sm text-red-600 hover:underline"
                onClick={() => removeItem(it.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 border rounded"
            >
              Return To Shop
            </button>
            <button
              onClick={() => clear()}
              className="px-4 py-2 border rounded"
            >
              Update Cart
            </button>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm h-max">
          <h2 className="mb-4 text-lg font-semibold">Cart Total</h2>
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
