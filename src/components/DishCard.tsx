"use client";

import Image from "next/image";
import { Dish } from "@/data/menu";
import { useCartStore } from "@/store/cart";

export default function DishCard({ dish }: { dish: Dish }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:scale-105 border-4"
      style={{
        background: "linear-gradient(135deg, #fffbe6 60%, #f5e9c6 100%)",
        borderColor: "#d4af37",
        position: "relative",
      }}
    >
      <div
        className="absolute inset-0 opacity-18 pointer-events-none"
        style={{
          backgroundImage: "url('/egyptian-hiero-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 50px",
        }}
      />
      <div className="relative h-40 w-full bg-[#fffbe6] overflow-hidden border-b-2 border-[#d4af37]">
        <Image src={dish.image || "/next.svg"} alt={dish.name} fill className="object-cover filter drop-shadow-lg" />
      </div>
      <div className="relative p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-[#bfa14a] text-lg drop-shadow-sm">{dish.name}</h3>
        <p className="text-sm text-[#7c5c13] mt-2 line-clamp-2 leading-relaxed font-medium">{dish.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-bold text-[#d4af37] text-lg">${dish.price.toFixed(2)}</span>
          <button
            onClick={() => addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image })}
            className="rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa14a] px-4 py-2 text-white font-bold text-sm hover:from-[#bfa14a] hover:to-[#d4af37] transition-all duration-300 shadow-md border-2 border-[#d4af37]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}



