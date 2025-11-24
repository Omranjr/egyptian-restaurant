"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, useEffect, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push(callbackUrl);
      }
    });

    // Check for error in URL
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError("Sign in failed. Please try again.");
    }
  }, [router, callbackUrl, searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    if (isSignUp && !name) {
      setError("Please enter your name");
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await signIn("credentials", {
        email,
        name: isSignUp ? name : undefined,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to sign in. Please try again.");
        console.error("Sign in error:", result.error);
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: "linear-gradient(135deg, #fffbe6 60%, #f5e9c6 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/egyptian-hiero-pattern.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
      
      <div className="max-w-md w-full space-y-8 p-8 relative">
        <div
          className="rounded-2xl p-8 border-4 shadow-2xl bg-white/80 backdrop-blur-sm"
          style={{ borderColor: "#d4af37" }}
        >
          <div className="text-center mb-8">
            <Image src="/lotus-icon.svg" alt="Lotus" width={64} height={64} className="mx-auto mb-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent mb-2">
              𓂀 Fata Morgana 𓂀
            </h1>
            <p className="text-[#7c5c13] text-lg">Sign in to your royal account</p>
            <p className="text-[#7c5c13]/70 text-sm mt-2">Experience the divine flavors of ancient Egypt</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#7c5c13] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:outline-none bg-white text-[#7c5c13]"
                  placeholder="Your name"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#7c5c13] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:outline-none bg-white text-[#7c5c13]"
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#bfa14a] text-white font-bold text-lg hover:from-[#bfa14a] hover:to-[#d4af37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border-2 border-[#d4af37]"
            >
              {isLoading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-[#d4af37] hover:text-[#bfa14a] text-sm font-medium transition-colors"
            >
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#7c5c13]/60">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#d4af37] text-xl">Loading...</div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
