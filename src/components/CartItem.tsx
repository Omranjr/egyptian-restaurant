"use client";

import Image from "next/image";
import { CartItem as Item, useCartStore } from "@/store/cart";

export default function CartItem({ item }: { item: Item }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div
      className="flex items-center gap-4 py-4 border-b-2 last:border-b-0 rounded-xl shadow-md"
      style={{
        background: "linear-gradient(135deg, #fffbe6 60%, #f5e9c6 100%)",
        borderColor: "#d4af37",
        borderBottomWidth: "2px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0 opacity-18 pointer-events-none"
        style={{
          backgroundImage: "url('/egyptian-lotus-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative h-16 w-16 rounded-lg bg-[#fffbe6] overflow-hidden border-2 border-[#d4af37]">
        <Image src={item.image || "/next.svg"} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-[#bfa14a]">{item.name}</p>
        <p className="text-sm text-[#7c5c13] font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 border-2 border-[#d4af37] rounded-lg text-[#d4af37] bg-white hover:bg-[#d4af37] hover:text-white transition-colors flex items-center gap-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          <Image src="/lotus-icon.svg" alt="Lotus" width={14} height={14} className="inline-block" />
          -
        </button>
        <span className="w-8 text-center text-[#bfa14a] font-bold">{item.quantity}</span>
        <button className="px-3 py-1 border-2 border-[#d4af37] rounded-lg text-[#d4af37] bg-white hover:bg-[#d4af37] hover:text-white transition-colors flex items-center gap-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          <Image src="/lotus-icon.svg" alt="Lotus" width={14} height={14} className="inline-block" />
          +
        </button>
      </div>
      <button className="text-red-400 hover:text-red-300 text-sm ml-4 font-medium transition-colors" onClick={() => removeItem(item.id)}>Remove</button>
    </div>
  );
}



