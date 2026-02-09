import Link from "next/link";
import SignIn from "@/components/auth/sign-in";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { Suspense } from "react";

async function LoginContent() {
  const session = await auth();

  if (session) {
    redirect("/profile");
  }

  return (
    <div className="hero flex items-center justify-center py-10 sm:py-12 lg:py-16">
      <div className="hero-content flex-col w-full max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-4 leading-none">
            REGAIN <br className="hidden xs:block" /> CONTROL.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-medium max-w-md mx-auto">
            Access your attribution dashboard. Stop guessing and start scaling with real Stripe data.
          </p>
        </div>

        <div className="card bg-slate-900 border border-white/10 w-full shadow-2xl rounded-[2rem] sm:rounded-[3rem] overflow-hidden transition-all duration-500 hover:border-blue-500/30">
          <div className="card-body p-5 sm:p-8">
            <fieldset className="fieldset bg-slate-950/50 border border-white/5 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8">
              <legend className="fieldset-legend text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-blue-500 px-3 sm:px-4 bg-slate-900 border border-white/10 rounded-full py-1">Identity verification</legend>

              <div className="w-full flex flex-col gap-1.5 mb-3">
                <label className="label text-slate-400 font-bold p-0 px-1 text-xs sm:text-sm">Business Email</label>
                <input type="email" placeholder="name@company.com" className="input bg-slate-900 border-white/10 focus:border-blue-500 focus:bg-slate-900/80 rounded-xl w-full h-11 sm:h-12" required />
              </div>
              
              <div className="w-full flex flex-col gap-1.5 mb-2">
                <label className="label text-slate-400 font-bold p-0 px-1 text-xs sm:text-sm">Access Key</label>
                <input type="password" placeholder="••••••••" className="input bg-slate-900 border-white/10 focus:border-blue-500 focus:bg-slate-900/80 rounded-xl w-full h-11 sm:h-12" required />
              </div>

              <div className="text-right mb-4">
                <a className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-slate-600 hover:text-blue-400 transition-colors cursor-pointer">Recover Access</a>
              </div>

              <button className="btn btn-primary rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 border-none text-white h-12 sm:h-14 w-full transition-all hover:scale-[1.02] active:scale-[0.98]">
                Sign In to Signal
              </button>
            </fieldset>

            <div className="divider text-[9px] sm:text-[10px] font-black opacity-10 uppercase tracking-[0.3em] my-6 text-slate-500">Social Authentication</div>

            <div className="flex justify-center">
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 relative">
      {/* Precision Background Grid */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
        </div>
      }>
        <LoginContent />
      </Suspense>

      <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pb-12 relative z-10">
        New to scientific tracking? <Link href="/register" className="text-blue-500 hover:text-white transition-colors">Apply for access</Link>
      </p>
    </main>
  );
}
