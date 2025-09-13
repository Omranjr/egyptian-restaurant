"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const totalItems = useCartStore((s) => s.totalItems());

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

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
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-[#d4af37]"
                />
              )}
              <span className="text-[#7c5c13] font-medium">
                Welcome, {session.user?.name?.split(" ")[0] || "Royal Guest"}
              </span>
              <button
                onClick={handleSignOut}
                className="text-[#d4af37] hover:text-[#bfa14a] transition-colors font-medium px-3 py-1 rounded-lg border border-[#d4af37] hover:bg-[#d4af37] hover:text-white"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="text-white bg-gradient-to-r from-[#d4af37] to-[#bfa14a] hover:from-[#bfa14a] hover:to-[#d4af37] transition-all font-medium px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 10.25v3.5h4.28c-.18.94-.74 1.77-1.57 2.31v1.94h2.52c1.49-1.37 2.35-3.39 2.35-5.78 0-.56-.05-1.1-.14-1.63H12z"/>
                <path fill="currentColor" d="M6.12 14.56c-.18-.73-.28-1.5-.28-2.31s.1-1.58.28-2.31V7.69H3.6c-.8 1.45-1.26 3.12-1.26 4.94s.46 3.49 1.26 4.94l2.52-2.01z"/>
                <path fill="currentColor" d="M12 5.5c1.36 0 2.59.49 3.55 1.29l2.67-2.67C16.65 2.69 14.52 1.75 12 1.75 7.7 1.75 4.13 4.47 2.34 8.25l2.52 2.01C5.84 7.43 8.72 5.5 12 5.5z"/>
              </svg>
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}



