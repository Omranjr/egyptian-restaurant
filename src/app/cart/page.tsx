"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clear = useCartStore((s) => s.clear);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Your Royal Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-amber-200 text-lg mb-4">Your cart awaits the treasures of Egypt...</p>
          <Link href="/menu" className="inline-block rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 text-black font-bold hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/25">
            Browse Our Royal Menu
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 border-2 border-amber-500/30 rounded-xl p-6 bg-gradient-to-b from-black to-gray-900 shadow-lg">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <aside className="border-2 border-amber-500/30 rounded-xl p-6 h-fit bg-gradient-to-b from-black to-gray-900 shadow-lg">
            <h2 className="text-xl font-bold text-amber-300 mb-4">Order Summary</h2>
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-amber-200">Total</span>
              <span className="text-2xl font-bold text-amber-400">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={clear} className="px-4 py-2 border border-amber-500 rounded-lg text-amber-300 hover:bg-amber-500 hover:text-black transition-colors flex-1">Clear Cart</button>
              <Link href="/checkout" className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-center flex-1 hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 shadow-md hover:shadow-amber-500/25">
                Proceed to Checkout
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}



