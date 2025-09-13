import { dishes } from "@/data/menu";
import DishCard from "./DishCard";

export default function Specials() {
  const specials = dishes.slice(0, 3);
  return (
    <section
      className="rounded-xl p-8 border-4 shadow-xl"
      style={{
        background: "linear-gradient(135deg, #fffbe6 60%, #f5e9c6 100%)",
        borderColor: "#d4af37",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "url('/egyptian-lotus-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "120px 120px",
        }}
      />
      <h2 className="relative text-2xl font-bold mb-6 bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent drop-shadow-lg">
        Today&apos;s Royal Specials
      </h2>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specials.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
}



