"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";

type Product = { id: number; title: string; price: number; image: string };

// API base (override via NEXT_PUBLIC_API_URL)
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002";

export default function Page() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { add, count, total } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setItems(data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>ShopLite</h1>
        <Link href="/cart">Cart ({count()}) — ${total().toFixed(2)}</Link>
      </header>

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        API: <code>{API}</code>
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {items.map((p) => (
          <article key={p.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
            <img src={p.image} alt={p.title} style={{ height: 140, objectFit: "contain", width: "100%" }} />
            <h3 style={{ fontSize: 14, minHeight: 40 }}>{p.title}</h3>
            <p style={{ fontWeight: 600 }}>${p.price}</p>
            <button onClick={() => add(p)} style={{ padding: "6px 10px" }}>
              Add to cart
            </button>
          </article>
        ))}
      </div>

      {!loading && !error && items.length === 0 && <p>No products found.</p>}
    </div>
  );
}
