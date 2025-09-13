"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ProfileFormProps {
  onComplete: () => void;
}

export default function ProfileForm({ onComplete }: ProfileFormProps) {
  const { data: session, update } = useSession();
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onComplete();
      }, 1000);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div
        className="rounded-xl p-6 border-4 shadow-xl relative"
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
          Complete Your Royal Profile
        </h2>
        <p className="text-[#7c5c13] mb-6">
          Please provide your details to complete your royal account setup.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#bfa14a] mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-2 border-[#d4af37] rounded-lg px-4 py-3 bg-white text-[#7c5c13] placeholder-[#bfa14a] focus:border-[#d4af37] focus:outline-none"
              placeholder="Your royal name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#bfa14a] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border-2 border-[#d4af37] rounded-lg px-4 py-3 bg-white text-[#7c5c13] placeholder-[#bfa14a] focus:border-[#d4af37] focus:outline-none"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#bfa14a] mb-2">
              Delivery Address
            </label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border-2 border-[#d4af37] rounded-lg px-4 py-3 bg-white text-[#7c5c13] placeholder-[#bfa14a] focus:border-[#d4af37] focus:outline-none"
              placeholder="Street, city, ZIP"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa14a] px-6 py-4 text-white font-bold text-lg hover:from-[#bfa14a] hover:to-[#d4af37] transition-all duration-300 shadow-lg border-2 border-[#d4af37] flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <Image src="/lotus-icon.svg" alt="Lotus" width={20} height={20} className="inline-block" />
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
