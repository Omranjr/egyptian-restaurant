"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav
      className="w-full border-b-4 sticky top-0 z-40 shadow-lg"
      style={{
        background: "linear-gradient(90deg, #fffbe6 80%, #f5e9c6 100%)",
        borderColor: "#d4af37",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "url('/egyptian-lotus-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent">
          <Image src="/lotus-icon.svg" alt="Lotus" width={28} height={28} className="inline-block mr-1" />
          𓂀 Fata Morgana 𓂀
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-[#7c5c13] hover:text-[#d4af37] transition-colors font-medium">Home</Link>
          <Link href="/menu" className="text-[#7c5c13] hover:text-[#d4af37] transition-colors font-medium">Menu</Link>
          <Link href="/cart" className="text-[#7c5c13] hover:text-[#d4af37] transition-colors font-medium flex items-center gap-2">
            <span className="bg-[#d4af37] text-white px-2 py-1 rounded-full text-xs font-bold min-w-[20px] text-center">
              {totalItems}
            </span>
            Cart
          </Link>
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 animate-pulse"></div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <span className="text-[#bfa14a] font-medium">
                Welcome, {session.user?.name?.split(" ")[0] || "Royal Guest"}
              </span>
              <button
                onClick={() => signOut()}
                className="text-[#d4af37] hover:text-[#bfa14a] transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="text-[#d4af37] hover:text-[#bfa14a] transition-colors font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}



