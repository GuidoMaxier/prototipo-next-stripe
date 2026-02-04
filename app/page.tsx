"use client";

import { useState } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Header Minimalista */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">U</div>
          <span className="text-xl font-bold tracking-tight text-slate-800 italic">US Incorporation</span>
        </div>
      </nav>

      <section className="px-6 py-12 md:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">
            All-in-one American Solution
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 max-w-4xl mx-auto">
            Constituye tu empresa en <span className="text-blue-600 font-extrabold italic">EE. UU.</span> hoy mismo.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Ideal si solo necesitas la constitución de la empresa como una LLC o C-Corp.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Card Única Professional */}
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-100/60 border border-slate-100 overflow-hidden">
            <div className="p-10 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Constitución de sociedades</h2>
                  <p className="text-slate-400 font-medium">Todo incluido para empezar</p>
                </div>
                <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <FeatureItem text="LLC o C-Corp en cualquier estado de EE. UU." />
                <FeatureItem text="Tasas estatales incluidas" />
                <FeatureItem text="EIN (Tax ID) incluido" />
                <FeatureItem text="Asistencia para cuenta bancaria" />
                <FeatureItem text="Servicio de agente registrado" />
                <FeatureItem text="Llamada de asesoramiento gratuita" />
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 flex items-center justify-between">
                <div>
                  <span className="text-4xl font-black text-slate-900">$599</span>
                  <span className="text-slate-400 font-bold text-sm ml-1">USD</span>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Pago único</span>
                </div>
              </div>

              <form action="/api/create-checkout-session" method="POST">
                {/* Enviamos cantidad 1 siempre por debajo para no complicar el API */}
                <input type="hidden" name="quantity" value="1" />
                
                <button
                  type="submit"
                  className="w-full group relative flex items-center justify-center px-8 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>Empezar Ahora</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>

              <div className="mt-8 flex justify-center items-center gap-4 grayscale opacity-40">
                <span className="w-8 h-8 rounded bg-slate-200"></span>
                <span className="w-8 h-8 rounded bg-slate-200"></span>
                <span className="w-8 h-8 rounded bg-slate-200"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-sm font-medium">
        © 2026 US Incorporation Solutions. Powered by <span className="text-slate-600 font-bold">Stripe</span>
      </footer>
    </main>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24 text-blue-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-slate-600 font-semibold">{text}</span>
    </div>
  );
}
