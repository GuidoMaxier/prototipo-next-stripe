import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-slate-950 text-slate-400 border-t border-white/5">
      <nav className="grid grid-flow-col gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
        <Link href="/" className="link link-hover hover:text-white transition-colors">Home</Link>
        <Link href="/demo" className="link link-hover hover:text-white transition-colors">Demo</Link>
        <Link href="/login" className="link link-hover hover:text-white transition-colors">Login</Link>
        <Link href="/register" className="link link-hover hover:text-white transition-colors">Register</Link>
        <Link href="/privacy" className="link link-hover hover:text-white transition-colors">Privacy</Link>
      </nav>
      <aside className="mt-2">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white font-black text-xs">A</div>
          <span className="text-sm font-black text-white tracking-widest uppercase italic">AdTracker</span>
        </div>
        <p className="text-xs font-medium">
          © 2026 - High-Precision Attribution for Stripe. <br />
          <span className="opacity-40 italic mt-1 block tracking-wider uppercase text-[9px]">Engineered for Profit</span>
        </p>
      </aside>
    </footer>
  );
}
