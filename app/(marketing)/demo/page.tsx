import Footer from "@/components/Footer";
import Script from "next/script";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

async function DemoContent() {
  const session = await auth();
  let userApiKey = "demo_key_123";

  if (session?.user?.id) {
    const project = await db.select().from(projects).where(eq(projects.userId, session.user.id)).get();
    if (project) userApiKey = project.apiKey;
  }

  return (
    <>
      {/* 1. LOAD OUR UNIVERSAL TRACKER WITH THE USER'S UNIQUE KEY */}
      <Script 
        src="/tracker.js" 
        data-client-id={userApiKey}
        strategy="afterInteractive" 
      />

      <div className="bg-slate-900 text-white text-center py-2 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10">
        Demo Persona: <span className="text-blue-400">"{session?.user ? "Personalized Dashboard" : "External Customer"}"</span>
      </div>
      
      {/* Campaign Simulator Panel (Floating UI for testing) */}
      <div className="fixed bottom-4 left-4 right-4 sm:bottom-auto sm:top-24 sm:left-6 sm:right-auto z-50 bg-white border border-slate-200 p-6 rounded-2xl shadow-2xl sm:max-w-sm">
        <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Campaign Simulator
        </h3>
        <p className="text-xs text-slate-500 mb-4 font-medium italic">
          Simula que este cliente llegó desde diferentes fuentes.
        </p>
        <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:flex-col gap-2">
          <Link href="/demo?utm_source=meta&utm_medium=cpc&utm_campaign=black_friday&fbclid=fb_998877" 
            className="btn btn-xs sm:btn-sm btn-outline btn-block rounded-lg normal-case text-[9px] sm:text-[10px] justify-between h-auto py-2">
            <span className="hidden xs:inline">Meta Ad</span>
            <span className="xs:hidden">Meta</span>
            <span className="badge badge-primary badge-sm scale-75 sm:scale-100">META</span>
          </Link>
          <Link href="/demo?utm_source=google&utm_medium=search&gclid=g_112233" 
            className="btn btn-xs sm:btn-sm btn-outline btn-block rounded-lg normal-case text-[9px] sm:text-[10px] justify-between h-auto py-2">
            <span className="hidden xs:inline">Google Search</span>
            <span className="xs:hidden">Google</span>
            <span className="badge badge-success badge-sm text-white border-none scale-75 sm:scale-100">GA</span>
          </Link>
          <Link href="/demo" 
            className="btn btn-xs sm:btn-sm btn-outline btn-block rounded-lg normal-case text-[9px] sm:text-[10px] justify-between h-auto py-2">
            <span>Organic</span>
            <span className="badge badge-ghost badge-sm border-slate-200 scale-75 sm:scale-100">DIRECT</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default async function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Suspense fallback={
        <div className="bg-slate-900 text-white text-center py-2 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10 animate-pulse">
          Loading Simulation Environment...
        </div>
      }>
        <DemoContent />
      </Suspense>

      <div className="max-w-4xl mx-auto py-32 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Visual Product Representation */}
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-all"></div>
            <div className="relative aspect-[4/5] bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-8">
              <div className="w-full h-2/3 bg-slate-100 rounded-2xl flex items-center justify-center">
                <div className="w-24 h-24 bg-white/80 rounded-full shadow-inner flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 pt-6 space-y-2">
                <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
                <div className="h-4 w-1/2 bg-slate-50 rounded"></div>
              </div>
            </div>
          </div>

          {/* Product Minimal Info */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-200">
              External Landing Page
            </div>
            <h1 className="text-5xl font-black tracking-tighter mb-4 text-slate-950 leading-[0.9]">Simulated <br />Customer Site.</h1>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed font-medium">
              Esta es una página externa (Cliente A). <br />
              <span className="text-slate-400 font-normal">
                Aquí el cliente navega y nuestro script `tracker.js` está enviando señales a tu SaaS en tiempo real.
              </span>
            </p>
            
            <div className="flex items-baseline gap-2 mb-10">
              <span className="text-5xl font-black text-slate-950 tracking-tighter">$599</span>
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">one-time</span>
            </div>

            <form action="/api/create-checkout-session" method="POST">
              <input type="hidden" name="lookup_key" value="premium_inc" />
              <button 
                type="submit" 
                className="btn btn-neutral btn-block btn-lg rounded-2xl h-16 font-black uppercase tracking-widest shadow-2xl shadow-slate-300 hover:-translate-y-1 hover:shadow-blue-500/10 transition-all border-none bg-slate-900"
              >
                Purchase Service
              </button>
            </form>
            
            <p className="mt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Conversion will be attributed back to you
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
