import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110">
                A
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                AdTracker
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
               <Link href="/demo" className="text-xs font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Live Demo
              </Link>
              <Link href="/#how-it-works" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">The Logic</Link>
              <Link href="/pricing" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="btn btn-ghost btn-sm font-bold opacity-70 hover:opacity-100">
                  Log in
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm rounded-lg px-6 font-bold text-white shadow-lg shadow-primary/20">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-white/10 p-0.5">
                  <div className="w-10 rounded-lg overflow-hidden bg-slate-800">
                    <img
                      alt={user.name || "User Avatar"}
                      src={user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-slate-900 rounded-2xl z-[1] mt-3 w-64 p-2 shadow-2xl border border-white/10 ring-1 ring-white/5">
                  <div className="px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-1">Signed in as</p>
                    <p className="text-xs font-bold text-white truncate">{user.email}</p>
                  </div>
                  <div className="divider my-0 opacity-5"></div>
                  <li><Link href="/profile" className="rounded-xl py-3 font-bold text-white text-xs uppercase tracking-widest">Attribution Stats</Link></li>
                  <li><Link href="/settings" className="rounded-xl py-3 font-bold text-slate-400 text-xs uppercase tracking-widest">Pixel Health</Link></li>
                  <div className="divider my-0 opacity-5"></div>
                  <li>
                    <form action={async () => {
                      "use server";
                      await signOut();
                    }}>
                      <button type="submit" className="w-full text-left text-red-500 font-black rounded-xl py-3 text-xs uppercase tracking-widest px-4">
                        Disconnect
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
