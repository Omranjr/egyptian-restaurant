import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fata Morgana | Egyptian Restaurant",
  description: "Authentic Egyptian cuisine: koshari, grills, desserts and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Egyptian Background Image */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: "url('/20250913_1516_Elegant Egyptian Background_simple_compose_01k51kdpsjeq5aje8qzj6z7wy0.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Subtle White-Gold Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255, 251, 230, 0.85) 0%, rgba(245, 233, 198, 0.75) 50%, rgba(255, 255, 255, 0.80) 100%)",
          }}
        />
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8 min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
