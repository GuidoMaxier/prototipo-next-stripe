export default function TrackerVisual() {
  return (
    <section id="how-it-works" className="bg-slate-950 py-32 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background glow shadow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <h2 className="text-sm font-black text-blue-500 tracking-[0.4em] uppercase mb-4">The Logic of Profit</h2>
          <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">How AdTracker solves attribution.</p>
        </div>

        <div className="relative">
          {/* Connector lines (Desktop hidden on mobile) */}
          <div className="hidden lg:block absolute top-[50%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 max-w-6xl mx-auto">
            
            {/* Step 1: Ad Ingestion */}
            <div className="relative group">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] h-full flex flex-col gap-6 hover:border-blue-500/30 transition-all duration-500">
                <div className="flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">01 / Source</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-bold">f</div>
                      <span className="text-xs font-bold text-slate-300">Meta Ads</span>
                    </div>
                    <span className="text-[10px] text-red-500">Lost Data</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-[10px] font-bold">G</div>
                      <span className="text-xs font-bold text-slate-300">Google Ads</span>
                    </div>
                    <span className="text-[10px] text-red-500 opacity-60">Attributed?</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-auto font-medium">Standard pixels lose up to 30% of signals due to iOS & Privacy settings.</p>
              </div>
            </div>

            {/* Step 2: Scientific Match */}
            <div className="relative group">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 p-8 rounded-[2.5rem] h-full flex flex-col gap-6 shadow-[0_0_50px_rgba(59,130,246,0.05)] hover:border-blue-500/50 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">02 / Precision</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-3xl font-black text-white">$1,250</span>
                       <span className="text-[10px] font-bold text-blue-400">MATCHED</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[100%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    </div>
                  </div>
                  <div className="text-[10px] bg-blue-500/10 text-blue-400 p-2 rounded-lg font-mono text-center">
                    ID: STRIPE_SESSION_9432
                  </div>
                </div>
                <p className="text-xs text-blue-100/60 mt-auto font-medium">We correlate Stripe IDs with server-side digital fingerprints globally.</p>
              </div>
            </div>

            {/* Step 3: AI Sync */}
            <div className="relative group">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] h-full flex flex-col items-center justify-center text-center gap-6 hover:border-purple-500/30 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-[1px] rotate-3 group-hover:rotate-12 transition-transform">
                   <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                   </div>
                </div>
                <div>
                  <h4 className="font-black text-xl text-white">Algorithm <br />Feeding</h4>
                  <p className="text-[10px] text-slate-500 mt-2 font-medium">Synced with Conversion API (CAPI)</p>
                </div>
              </div>
            </div>

            {/* Step 4: Scale */}
            <div className="relative group">
              <div className="bg-blue-600 p-8 rounded-[2.5rem] h-full flex flex-col items-center justify-center text-center gap-4 shadow-2xl shadow-blue-500/40 hover:-rotate-1 transition-all duration-500">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Total Impact</div>
                <div className="text-5xl font-black text-white">+30%</div>
                <div className="text-sm font-bold text-blue-100 leading-tight">Return on <br /> Ad Spend (ROAS)</div>
                <div className="mt-4 py-2 px-4 bg-white/10 rounded-xl text-[10px] font-black text-white italic">SCALABLE GROWTH</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
