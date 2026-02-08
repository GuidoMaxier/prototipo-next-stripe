import Link from "next/link";
import Navbar from "@/components/Navbar";
import SignIn from "@/components/auth/sign-in";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <Navbar />
      
      {/* Precision Background Grid */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="hero mt-12 md:mt-20">
        <div className="hero-content flex-col lg:flex-row-reverse gap-16 max-w-6xl mt-5">
          <div className="text-center lg:text-left max-w-md">
            <h1 className="text-6xl font-black tracking-tighter leading-none mb-6">
              REGAIN <br /> CONTROL.
            </h1>
            <p className="py-6 text-slate-400 text-lg font-medium">
              Access your attribution dashboard. Stop guessing and start scaling with real Stripe data.
            </p>
          </div>

          <div className="card bg-slate-900 border border-white/10 w-full max-w-sm shrink-0 shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="card-body p-8">
              <fieldset className="fieldset bg-slate-950/50 border border-white/5 rounded-[2rem] p-6 lg:p-8">
                <legend className="fieldset-legend text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 px-4">Login Details</legend>

                <div className="w-full flex flex-col gap-1">
                  <label className="label text-slate-400 font-bold p-0 px-1">Email Address</label>
                  <input type="email" placeholder="name@company.com" className="input bg-slate-900 border-white/10 focus:border-blue-500 rounded-xl w-full" required />
                </div>
                
                <div className="w-full flex flex-col gap-1 mt-4">
                  <label className="label text-slate-400 font-bold p-0 px-1">Access Key</label>
                  <input type="password" placeholder="••••••••" className="input bg-slate-900 border-white/10 focus:border-blue-500 rounded-xl w-full" required />
                </div>

                <div className="mt-2 text-right">
                  <a className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-400 transition-colors cursor-pointer">Recover Key</a>
                </div>

                <button className="btn btn-primary mt-8 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 border-none text-white h-14 w-full">
                  Sign In
                </button>
              </fieldset>

              <div className="divider text-[10px] font-black opacity-10 uppercase tracking-[0.3em] my-6 text-slate-500">Social Login</div>

              <div className="align-center justify-center flex">
                  <SignIn />
                </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 pb-12">
        New to scientific tracking? <Link href="/register" className="text-blue-500 hover:text-white transition-colors">Apply for access</Link>
      </p>
    </main>
  );
}
