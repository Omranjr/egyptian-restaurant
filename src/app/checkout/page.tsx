"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import ProfileForm from "@/components/ProfileForm";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clear = useCartStore((s) => s.clear);

  const [userProfile, setUserProfile] = useState<{
    name?: string;
    phone?: string;
    address?: string;
  } | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "apple-pay">("cash");
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/checkout");
    }
  }, [status, router]);

  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      router.push("/cart");
    }
  }, [items, router, orderSuccess]);

  useEffect(() => {
    if (session?.user?.email) {
      // Fetch user profile
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUserProfile(data.user);
            // Show profile form if any required field is missing
            if (!data.user.phone || !data.user.address) {
              setShowProfileForm(true);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setShowProfileForm(true);
        });
    }
  }, [session]);

  const handlePlaceOrder = async () => {
    if (!userProfile?.phone || !userProfile?.address) {
      setShowProfileForm(true);
      return;
    }

    setIsSubmitting(true);
    setOrderError("");

    try {
      // Send order email
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userProfile.name || session?.user?.name || "Guest",
          email: session?.user?.email || "no-email@example.com",
          phone: userProfile.phone,
          address: userProfile.address,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total: totalPrice,
          paymentMethod: paymentMethod === "cash" ? "Cash on Delivery" : "Apple Pay",
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to place order");
      }

      // Success - clear cart and show success message
      setOrderSuccess(true);
      clear();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to place order. Please try again.";
      console.error("Error placing order:", error);
      setOrderError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileUpdate = (profile: { name?: string; phone?: string; address?: string }) => {
    setUserProfile(profile);
    setShowProfileForm(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#d4af37] text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (orderSuccess) {
    return (
      <div
        className="max-w-2xl mx-auto rounded-xl p-8 border-4 shadow-xl text-center relative"
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
        <div className="relative">
          <Image src="/lotus-icon.svg" alt="Success" width={80} height={80} className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-[#7c5c13] text-lg mb-4">
            Your royal feast is being prepared. We&apos;ll contact you at <strong>{userProfile?.phone}</strong> with
            delivery details.
          </p>
          <div className="bg-white/80 rounded-lg p-4 mb-6 border-2 border-[#d4af37]/30">
            <p className="text-[#7c5c13]">
              <strong>Payment Method:</strong> {paymentMethod === "cash" ? "💵 Cash on Delivery" : "🍎 Apple Pay"}
            </p>
            <p className="text-[#7c5c13] mt-2">
              <strong>Order Total:</strong> <span className="text-[#d4af37] font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa14a] text-white font-bold hover:from-[#bfa14a] hover:to-[#d4af37] transition-all border-2 border-[#d4af37]"
            >
              Back to Home
            </button>
            <button
              onClick={() => router.push("/menu")}
              className="px-6 py-3 rounded-lg border-2 border-[#d4af37] text-[#d4af37] font-bold hover:bg-[#d4af37] hover:text-white transition-all"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div
          className="md:col-span-2 rounded-xl p-6 border-4 shadow-xl relative"
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
          <h2 className="relative text-xl font-bold text-[#d4af37] mb-4">Order Summary</h2>
          <div className="relative space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-[#d4af37]/20">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden border-2 border-[#d4af37]">
                  <Image src={item.image || "/next.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#bfa14a]">{item.name}</p>
                  <p className="text-sm text-[#7c5c13]">Quantity: {item.quantity}</p>
                </div>
                <p className="font-bold text-[#d4af37]">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details */}
        <aside
          className="rounded-xl p-6 h-fit border-4 shadow-xl relative"
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
          <div className="relative">
            <h2 className="text-xl font-bold text-[#d4af37] mb-4">Delivery Details</h2>
            {userProfile?.phone && userProfile?.address ? (
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-[#7c5c13] font-semibold">Name</p>
                  <p className="text-[#bfa14a] font-bold">{userProfile.name || session.user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7c5c13] font-semibold">Phone</p>
                  <p className="text-[#bfa14a] font-bold">{userProfile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#7c5c13] font-semibold">Address</p>
                  <p className="text-[#bfa14a] font-bold">{userProfile.address}</p>
                </div>
                <button
                  onClick={() => setShowProfileForm(true)}
                  className="text-sm text-[#d4af37] hover:text-[#bfa14a] underline transition-colors"
                >
                  Edit Details
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-[#7c5c13] mb-3">Please complete your delivery details to place order.</p>
                <button
                  onClick={() => setShowProfileForm(true)}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa14a] text-white font-bold hover:from-[#bfa14a] hover:to-[#d4af37] transition-all border-2 border-[#d4af37]"
                >
                  Add Details
                </button>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="border-t-2 border-[#d4af37]/30 pt-4 mb-4">
              <h3 className="text-sm font-bold text-[#7c5c13] mb-3">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center p-3 border-2 border-[#d4af37]/30 rounded-lg cursor-pointer hover:border-[#d4af37] transition-colors bg-white">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value as "cash")}
                    className="w-4 h-4 text-[#d4af37] focus:ring-[#d4af37]"
                  />
                  <span className="ml-3 text-[#7c5c13] font-medium">💵 Cash on Delivery</span>
                </label>
                <label className="flex items-center p-3 border-2 border-[#d4af37]/30 rounded-lg cursor-pointer hover:border-[#d4af37] transition-colors bg-white">
                  <input
                    type="radio"
                    name="payment"
                    value="apple-pay"
                    checked={paymentMethod === "apple-pay"}
                    onChange={(e) => setPaymentMethod(e.target.value as "apple-pay")}
                    className="w-4 h-4 text-[#d4af37] focus:ring-[#d4af37]"
                  />
                  <span className="ml-3 text-[#7c5c13] font-medium">🍎 Apple Pay (Coming Soon)</span>
                </label>
              </div>
            </div>

            <div className="border-t-2 border-[#d4af37]/30 pt-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-[#7c5c13]">Total</span>
                <span className="text-2xl font-bold text-[#d4af37]">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {orderError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {orderError}
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting || !userProfile?.phone || !userProfile?.address}
              className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa14a] text-white font-bold text-lg hover:from-[#bfa14a] hover:to-[#d4af37] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md border-2 border-[#d4af37]"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </aside>
      </div>

      {/* Profile Form Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="max-w-md w-full rounded-xl p-8 border-4 shadow-2xl relative"
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
            <div className="relative">
              <h2 className="text-2xl font-bold text-[#d4af37] mb-4">Delivery Details</h2>
              <ProfileForm
                initialData={userProfile || {}}
                onSuccess={handleProfileUpdate}
                onCancel={() => setShowProfileForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
