import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="navbar top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8">
      {/* START: Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-900 rounded-2xl w-52 border border-white/10 uppercase font-bold text-[9px] tracking-widest">
            <li>
              <Link href="/demo" className="flex items-center gap-2">
                Live Demo
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              </Link>
            </li>
            <li><Link href="/#how-it-works">The Logic</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">A</div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic hidden xs:block">AdTracker</span>
        </Link>
      </div>

      {/* CENTER: Desktop Items */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 uppercase font-black text-[10px] tracking-widest text-slate-400">
          <li>
            <Link href="/demo" className="text-blue-400 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live Demo
            </Link>
          </li>
          <li><Link href="/#how-it-works" className="hover:text-white transition-colors">The Logic</Link></li>
          <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
        </ul>
      </div>

      {/* END: CTA / User */}
      <div className="navbar-end">
        {!user ? (
          <Link href="/login" className="btn btn-primary btn-sm rounded-xl px-6 font-black uppercase tracking-widest text-xs h-6 border-none sm:h-8">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-white/10 p-0.5">
              <div className="w-10 rounded-lg overflow-hidden"><img alt="User" src={user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} /></div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-slate-900 rounded-2xl w-64 border border-white/10">
              <div className="mb-2 px-2"><p className="text-[9px] font-black uppercase tracking-widest opacity-30 text-white">Identity</p><p className="text-xs font-bold text-slate-400 truncate">{user.email}</p></div>
              <div className="divider opacity-5 my-1"></div>
              <li><Link href="/profile" className="py-3 font-bold text-white text-xs uppercase tracking-widest">Profile</Link></li>
              <li><Link href="/dashboard" className="py-3 font-bold text-blue-500 text-xs uppercase tracking-widest">Dashboard</Link></li>
              <div className="divider opacity-5 my-1"></div>
              <li><form action={async () => { "use server"; await signOut(); }}><button className="text-red-500 font-bold text-xs uppercase tracking-widest w-full text-left">Logout</button></form></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
