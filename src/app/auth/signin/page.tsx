"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await signIn("google", {
        callbackUrl,
        redirect: false, // Handle redirect manually to catch errors
      });

      if (result?.error) {
        setError("Sign in failed. Please check your network connection and try again.");
        console.error("Sign in error:", result.error);
      } else if (result?.url) {
        // Successful sign-in, redirect manually
        window.location.href = result.url;
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
          
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-4 border-2 border-[#d4af37]/30 rounded-lg bg-gradient-to-r from-white to-[#fffbe6] text-[#7c5c13] hover:border-[#d4af37] hover:shadow-lg transition-all duration-300 disabled:opacity-50 font-medium"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? "Signing in..." : "Continue with Google"}
            </button>
          </div>

          <div className="mt-8 text-center space-y-4">
            <p className="text-xs text-[#7c5c13]/60">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-blue-900 text-sm mb-2">Setup Required:</h3>
              <div className="text-xs text-blue-800 space-y-1">
                <p>1. Go to <a href="https://console.cloud.google.com/" target="_blank" className="underline">Google Cloud Console</a></p>
                <p>2. Create OAuth 2.0 credentials</p>
                <p>3. Add authorized origins: <code className="bg-blue-100 px-1 rounded">http://localhost:3000</code></p>
                <p>4. Add redirect URI: <code className="bg-blue-100 px-1 rounded">http://localhost:3000/api/auth/callback/google</code></p>
                <p>5. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
