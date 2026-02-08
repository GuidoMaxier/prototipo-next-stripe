import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      
      {/* Precision Background Grid */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="hero mt-12 md:mt-12">
        <div className="hero-content flex-col w-full max-w-2xl px-6">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black tracking-tighter uppercase mb-4 mt-10">Join the Network.</h1>
            <p className="text-slate-400 font-medium">Start scaling your ads with 99.9% attribution accuracy.</p>
          </div>
          
          <div className="card bg-slate-900 border border-white/10 w-full shadow-2xl rounded-[3rem] overflow-hidden">
            <div className="card-body p-8">
              <fieldset className="fieldset bg-slate-950/50 border border-white/5 rounded-[2rem] p-8">
                <legend className="fieldset-legend text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 px-4">Account registration</legend>

                {/* Grid for First and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-2">
                  <div className="flex flex-col gap-1">
                    <label className="label text-slate-400 font-bold p-0 px-1">First Name</label>
                    <input type="text" placeholder="Elon" className="input bg-slate-900 border-white/10 focus:border-blue-500 rounded-xl w-full" required />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="label text-slate-400 font-bold p-0 px-1">Last Name</label>
                    <input type="text" placeholder="Musk" className="input bg-slate-900 border-white/10 focus:border-blue-500 rounded-xl w-full" required />
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1 mt-2">
                  <label className="label text-slate-400 font-bold p-0 px-1">Business Email</label>
                  <input type="email" placeholder="ceo@company.com" className="input bg-slate-900 border-white/10 focus:border-blue-500 rounded-xl w-full" required />
                </div>

                <div className="w-full flex flex-col gap-1 mt-2">
                  <label className="label text-slate-400 font-bold p-0 px-1">Choose Access Key</label>
                  <input type="password" placeholder="••••••••" className="input bg-slate-900 border-white/10 focus:border-blue-500 rounded-xl w-full" required />
                </div>

                <div className="mt-6">
                  <label className="label cursor-pointer justify-start gap-4 p-0">
                    <input type="checkbox" className="checkbox checkbox-primary rounded-md border-white/20" required />
                    <span className="label-text text-[10px] text-slate-500 font-black uppercase tracking-widest">
                      Accept Scientific Data Privacy Policy
                    </span>
                  </label>
                </div>

                <button className="btn btn-primary mt-8 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 border-none text-white h-14 w-full">
                  Verify & Create Account
                </button>
              </fieldset>
            </div>
          </div>
          
          <p className="my-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pb-12">
            Already a partner? <Link href="/login" className="text-blue-500 hover:text-white transition-colors">Sign in here</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
