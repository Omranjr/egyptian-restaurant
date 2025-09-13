import Hero from "@/components/Hero";
import Specials from "@/components/Specials";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <section
        className="rounded-xl p-8 border-4 shadow-xl relative"
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
        <h2 className="relative text-2xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent">
          About Our Royal Kitchen
        </h2>
        <p className="relative text-[#7c5c13] max-w-prose text-lg leading-relaxed font-medium">
          Welcome to Fata Morgana, where ancient Egyptian culinary traditions meet modern excellence. 
          Our royal kitchen blends sacred family recipes with the finest ingredients to bring you 
          the divine flavors of the pharaohs. Every dish tells a story of the Nile&apos;s bounty.
        </p>
      </section>
      <Specials />
    </div>
  );
}
