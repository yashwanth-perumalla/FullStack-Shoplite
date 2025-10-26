"use client";
import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, remove, total } = useCart();
  return (
    <div>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link href="/">← Continue Shopping</Link>
        <h1>Your Cart</h1>
      </header>
      {items.length === 0 && <p>Cart is empty.</p>}
      <ul style={{ marginTop: 12 }}>
        {items.map((i) => (
          <li key={i.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0" }}>
            <img src={i.image} alt={i.title} style={{ height: 40, width: 40, objectFit: "contain" }} />
            <span style={{ flex: 1 }}>{i.title}</span>
            <span>${i.price}</span>
            <button onClick={() => remove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3 style={{ marginTop: 12 }}>Total: ${total().toFixed(2)}</h3>
    </div>
  );
}
