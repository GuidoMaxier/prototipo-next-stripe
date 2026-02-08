import Link from "next/link";

export default function SaasHero() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-950 px-6 pt-24 sm:pt-32 lg:px-8 min-h-[90vh] flex flex-col justify-center">
      {/* Precision Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-400 ring-1 ring-blue-500/30 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Hyper-Accurate Attribution Engine
          </div>
        </div>
        
        <h1 className="text-6xl font-black tracking-tighter text-white sm:text-8xl leading-[0.9] mb-8">
          TRACK EVERY <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400">
            STRIPE DOLLAR.
          </span>
        </h1>
        
        <p className="mt-8 text-xl leading-relaxed text-slate-400 max-w-3xl mx-auto font-medium">
          AdTracker uses server-side digital fingerprinting to link every Stripe payment to its original ad click. 
          Feed the AI with 100% accurate profit data, not estimated events.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/register"
            className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white transition-all duration-200 bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-[0_10px_40px_rgba(37,99,235,0.3)] hover:-translate-y-1"
          >
            Scale My Ads Now
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link 
            href="/demo" 
            className="btn btn-ghost text-white btn-lg rounded-2xl border-white/10 px-8 hover:bg-white/5 font-bold"
          >
            Watch Demo
          </Link>
        </div>

        {/* scientific proof / ROI indicator */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/5 pt-12">
          <div>
            <div className="text-3xl font-black text-white">99.9%</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Match Rate</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-500">+32%</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">ROAS Increase</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">0ms</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Latency</div>
          </div>
          <div>
            <div className="text-3xl font-black text-purple-500">100%</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">iOS Reliable</div>
          </div>
        </div>
      </div>
    </div>
  );
}
