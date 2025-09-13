import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border-4 shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #fffbe6 60%, #f5e9c6 100%)",
        borderColor: "#d4af37",
      }}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "url('/egyptian-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#d4af37] via-[#bfa14a] to-[#7c5c13] bg-clip-text text-transparent drop-shadow-lg">
            Fata Morgana 
          </h1>
          <p className="mt-6 text-[#7c5c13] max-w-prose text-lg leading-relaxed font-semibold">
            Experience the divine flavors of ancient Egypt. From the sacred koshari to the royal grills,
            taste the legacy of the pharaohs in every bite.
          </p>
          <div className="mt-8">
            <Link
              href="/menu"
              className="inline-block rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa14a] px-8 py-4 text-white font-bold text-lg shadow-lg hover:from-[#bfa14a] hover:to-[#d4af37] transition-all duration-300 transform hover:scale-105 border-2 border-[#d4af37] flex items-center gap-2"
            >
              <Image src="/lotus-icon.svg" alt="Lotus" width={22} height={22} className="inline-block" />
              Explore Our Royal Menu
            </Link>
          </div>
        </div>
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl border-2 border-[#d4af37] bg-[#fffbe6] shadow-lg">
          <Image
            src="/images/hero.jpg.png"
            alt="Egyptian cuisine"
            fill
            className="object-cover filter drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}



