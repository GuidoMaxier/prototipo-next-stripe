"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout-session?sessionId=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSession(data);
          
          // --- Conversion Tracking ---
          if (typeof window !== "undefined") {
            // Meta Pixel Purchase Event
            if ((window as any).fbq) {
              (window as any).fbq("track", "Purchase", {
                value: data.amount_total / 100,
                currency: data.currency.toUpperCase(),
              });
            }
            
            // Google Ads / Analytics Conversion
            if ((window as any).gtag) {
              (window as any).gtag("event", "purchase", {
                transaction_id: data.id,
                value: data.amount_total / 100,
                currency: data.currency.toUpperCase(),
              });
            }
          }
        })
        .catch((err) => console.error("Error fetching session:", err));
    }
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce transition-transform duration-1000">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
          Welcome to the USA!
        </h1>
        <p className="text-slate-500 text-lg mb-10 max-w-sm mx-auto">
          Your incorporation process has started successfully. Expect an email with your next steps shortly.
        </p>

        {session && (
          <div className="text-left bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100">
            <h3 className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-4">Transaction Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Order ID</span>
                <span className="text-slate-800 font-mono text-xs">{session.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Amount Paid</span>
                <span className="text-slate-900 font-bold">${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center"
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all text-center"
          >
            Download Receipt
          </button>
        </div>
      </div>

      <p className="mt-8 text-slate-400 text-sm font-medium">
        Reference: {sessionId?.substring(0, 15)}...
      </p>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-bold text-slate-400">Loading receipt...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
