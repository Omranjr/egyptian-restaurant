import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full border-t-4 mt-12"
      style={{
        background: "linear-gradient(90deg, #fffbe6 80%, #f5e9c6 100%)",
        borderColor: "#d4af37",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/egyptian-lotus-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-[#bfa14a] font-medium">
          <Image src="/lotus-icon.svg" alt="Lotus" width={20} height={20} className="inline-block" />
          © {new Date().getFullYear()} 𓂀 Fata Morgana 𓂀. All rights reserved.
        </p>
        <div className="text-[#7c5c13] text-center sm:text-right">
          <p className="font-semibold">Call: +1 (555) 123-4567</p>
          <p className="text-[#bfa14a]">123 Nile Street, Cairo</p>
        </div>
      </div>
    </footer>
  );
}



