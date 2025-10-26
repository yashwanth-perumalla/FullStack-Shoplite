"use client";
import { create } from "zustand";

type Item = { id: number; title: string; price: number; image: string };

type CartState = {
  items: Item[];
  add: (item: Item) => void;
  remove: (id: number) => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  count: () => get().items.length,
  total: () => get().items.reduce((a, b) => a + (b.price || 0), 0),
}));
