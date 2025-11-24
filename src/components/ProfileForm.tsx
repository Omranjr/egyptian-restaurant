"use client";

import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";

interface ProfileFormProps {
  initialData?: {
    name?: string;
    phone?: string;
    address?: string;
  };
  onSuccess?: (profile: { name?: string; phone?: string; address?: string }) => void;
  onCancel?: () => void;
}

export default function ProfileForm({ initialData, onSuccess, onCancel }: ProfileFormProps) {
  const { data: session } = useSession();
  const [name, setName] = useState(initialData?.name || session?.user?.name || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone || !address) {
      setError("Phone and address are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, address }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      await response.json();
      if (onSuccess) {
        onSuccess({ name, phone, address });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-[#7c5c13] mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border-2 border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:outline-none bg-white text-[#7c5c13]"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-[#7c5c13] mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-2 border-2 border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:outline-none bg-white text-[#7c5c13]"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-semibold text-[#7c5c13] mb-2">
          Delivery Address *
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-2 border-2 border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:outline-none bg-white text-[#7c5c13]"
          placeholder="123 Nile Street, Cairo"
        />
      </div>

      <div className="flex gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border-2 border-[#d4af37] rounded-lg text-[#d4af37] font-bold hover:bg-[#d4af37] hover:text-white transition-all"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa14a] text-white font-bold hover:from-[#bfa14a] hover:to-[#d4af37] transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#d4af37]"
        >
          {isSubmitting ? "Saving..." : "Save Details"}
        </button>
      </div>
    </form>
  );
}
