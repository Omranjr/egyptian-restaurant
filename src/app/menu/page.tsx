import { categories, dishes } from "@/data/menu";
import DishCard from "@/components/DishCard";

export const dynamic = "force-static";

export default function MenuPage() {
  return (
    <div className="space-y-10">
      <header
        className="text-center py-8 rounded-xl border-4 shadow-xl relative"
        style={{
          background: "linear-gradient(135deg, #fffbe6 60%, #f5e9c6 100%)",
          borderColor: "#d4af37",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0 opacity-18 pointer-events-none"
          style={{
            backgroundImage: "url('/egyptian-lotus-pattern.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "100px 100px",
          }}
        />
        <h1 className="relative text-4xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent">Royal Menu</h1>
        <p className="relative text-[#7c5c13] text-lg">Explore our divine categories and sacred dishes.</p>
      </header>

      {categories.map((cat) => {
        const items = dishes.filter((d) => d.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section
            key={cat.id}
            className="space-y-6 rounded-xl p-8 border-4 shadow-xl relative"
            style={{
              background: "linear-gradient(135deg, #fffbe6 60%, #f5e9c6 100%)",
              borderColor: "#d4af37",
              overflow: "hidden",
            }}
          >
            <div
              className="absolute inset-0 opacity-18 pointer-events-none"
              style={{
                backgroundImage: "url('/egyptian-lotus-pattern.svg')",
                backgroundRepeat: "repeat",
                backgroundSize: "100px 100px",
              }}
            />
            <h2 className="relative text-2xl font-bold text-center bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent">{cat.name}</h2>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}



