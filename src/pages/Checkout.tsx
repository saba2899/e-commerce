import { useCart } from "../context/cart-context";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useUser } from "../context/useUser";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const { user } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (!user) return;
    const key = `checkout_info_${user.id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const d = JSON.parse(saved) as any;
      setFirstName(d.firstName ?? "");
      setLastName(d.lastName ?? "");
      setCompany(d.company ?? "");
      setStreet(d.street ?? user.address ?? "");
      setApt(d.apt ?? "");
      setCity(d.city ?? "");
      setPhone(d.phone ?? "");
      setEmail(d.email ?? user.email ?? "");
      setRemember(true);
      return;
    }
    const tokens = (user.name ?? "").trim().split(/\s+/);
    setFirstName(tokens[0] ?? "");
    setLastName(tokens.slice(1).join(" "));
    setEmail(user.email ?? "");
    setStreet(user.address ?? "");
  }, [user?.id]);

  function persistIfNeeded() {
    if (!user || !remember) return;
    const key = `checkout_info_${user.id}`;
    const data = {
      firstName,
      lastName,
      company,
      street,
      apt,
      city,
      phone,
      email,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  function validate(): boolean {
    const nameOk = firstName.trim().length >= 2;
    const lastOk = lastName.trim().length >= 2;
    const streetOk = street.trim().length >= 3;
    const cityOk = city.trim().length >= 2;
    const phoneOk = /[+]?\d[\d\s-]{6,}/.test(phone.trim());
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
    setErr({
      firstName: nameOk ? "" : "Please enter your first name (min 2).",
      lastName: lastOk ? "" : "Please enter your last name (min 2).",
      street: streetOk ? "" : "Street address is required.",
      city: cityOk ? "" : "Town/City is required.",
      phone: phoneOk ? "" : "Enter a valid phone number.",
      email: emailOk ? "" : "Enter a valid email address.",
    });
    return nameOk && lastOk && streetOk && cityOk && phoneOk && emailOk;
  }

  function placeOrder() {
    if (!validate()) return;
    setPlacing(true);
    setTimeout(() => {
      persistIfNeeded();
      clear();
      navigate("/", { replace: true });
      alert("Order placed successfully (demo)");
    }, 800);
  }

  return (
    <div className="py-8 page-container">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <form className="space-y-4 lg:col-span-2" onChange={persistIfNeeded}>
          <div>
            <label className="block mb-1 text-sm font-medium">
              First Name*
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {err.firstName && (
              <p className="mt-1 text-xs text-red-600">{err.firstName}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Last Name*</label>
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {err.lastName && (
              <p className="mt-1 text-xs text-red-600">{err.lastName}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Company Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Street Address*
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="123 Main St"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            {err.street && (
              <p className="mt-1 text-xs text-red-600">{err.street}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Apartment, floor, etc.
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Apt 4B"
              value={apt}
              onChange={(e) => setApt(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Town/City*</label>
            <input
              className="w-full px-3 py-2 border rounded"
              placeholder="Gotham"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {err.city && (
              <p className="mt-1 text-xs text-red-600">{err.city}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium">Phone*</label>
              <input
                className="w-full px-3 py-2 border rounded"
                placeholder="(+995) 555 55 55"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {err.phone && (
                <p className="mt-1 text-xs text-red-600">{err.phone}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email*</label>
              <input
                className="w-full px-3 py-2 border rounded"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {err.email && (
                <p className="mt-1 text-xs text-red-600">{err.email}</p>
              )}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Save this information for faster checkout
          </label>
        </form>

        <div className="p-4 bg-white rounded-lg shadow-sm h-max">
          <ul className="divide-y">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-sm">{it.title}</span>
                </div>
                <span className="text-sm">
                  ${(it.price * it.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between py-2 border-t mt-3">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between py-3">
            <span>Total</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="pay" defaultChecked /> Bank
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="pay" /> Cash on delivery
            </label>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <input
              className="flex-1 px-3 py-2 border rounded"
              placeholder="Coupon Code"
            />
            <button className="px-3 py-2 text-sm border rounded">
              Apply Coupon
            </button>
          </div>

          <button
            onClick={placeOrder}
            disabled={placing}
            className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded disabled:opacity-60"
          >
            {placing ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
