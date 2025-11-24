"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration. Please contact support.",
  AccessDenied: "Access was denied. You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication. Please try again.",
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Default";
  const message = errorMessages[error] || errorMessages.Default;

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
          className="rounded-2xl p-8 border-4 shadow-2xl bg-white/80 backdrop-blur-sm text-center"
          style={{ borderColor: "#d4af37" }}
        >
          <Image src="/lotus-icon.svg" alt="Lotus" width={64} height={64} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#bfa14a] bg-clip-text text-transparent mb-4">
            Authentication Error
          </h1>
          
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{message}</p>
          </div>

          {error === "Configuration" && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
              <h3 className="font-semibold text-yellow-900 text-sm mb-2">Configuration Issue:</h3>
              <div className="text-xs text-yellow-800 space-y-1">
                <p>• Check that NEXTAUTH_SECRET is configured in .env.local</p>
                <p>• Verify that the database connection is working</p>
                <p>• Ensure all required environment variables are set</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="inline-block w-full bg-gradient-to-r from-[#d4af37] to-[#bfa14a] text-white px-6 py-3 rounded-lg font-medium hover:from-[#bfa14a] hover:to-[#d4af37] transition-all"
            >
              Try Again
            </Link>
            
            <Link
              href="/"
              className="inline-block w-full border-2 border-[#d4af37] text-[#d4af37] px-6 py-3 rounded-lg font-medium hover:bg-[#d4af37] hover:text-white transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#d4af37] text-xl">Loading...</div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}
