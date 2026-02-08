import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SidebarNav from "@/components/dashboard/SidebarNav";
import { Suspense } from "react";

async function SidebarContent() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const user = session.user;

  return (
    <div className="w-80 min-h-full bg-slate-900 border-r border-white/10 flex flex-col">
      {/* Logo Section */}
      <div className="p-8 pb-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110">
            A
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            AdTracker
          </span>
        </Link>
      </div>

      <div className="divider opacity-5 mx-6"></div>

      {/* Navigation Links */}
      <SidebarNav />

      {/* User Profile Footer in Sidebar */}
      <div className="p-4 mt-auto border-t border-white/5 bg-slate-950/30">
        <div className="flex items-center gap-4 p-2">
          <div className="avatar h-10 w-10 border border-white/10 rounded-xl overflow-hidden bg-slate-800">
            <img 
              src={user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
              alt={user.name || "User"} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0" title={user.email || ""}>
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] font-medium text-slate-500 truncate italic">Plan: Enterprise</p>
          </div>
        </div>
        <form action={async () => {
          "use server";
          await signOut();
        }}>
          <button type="submit" className="btn btn-ghost btn-block btn-sm text-red-500 font-black mt-2 rounded-lg text-[10px] uppercase tracking-widest px-0 hover:bg-red-500/10">
            Disconnect
          </button>
        </form>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
        {/* Navbar for Mobile */}
        <div className="lg:hidden navbar bg-slate-900 border-b border-white/5 px-4 h-16 sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl font-black tracking-tighter uppercase italic">AdTracker</Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-grow p-4 md:p-8 lg:p-12 relative overflow-hidden">
             {/* Background Grid - Global for Dashboard */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10">
                {children}
            </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <Suspense fallback={
          <div className="w-80 min-h-full bg-slate-900 border-r border-white/10 flex flex-col animate-pulse p-8">
            <div className="h-8 w-32 bg-slate-800 rounded mb-12"></div>
            <div className="space-y-4">
              <div className="h-12 w-full bg-slate-800 rounded-xl"></div>
              <div className="h-12 w-full bg-slate-800 rounded-xl"></div>
              <div className="h-12 w-full bg-slate-800 rounded-xl"></div>
            </div>
          </div>
        }>
          <SidebarContent />
        </Suspense>
      </div>
    </div>
  );
}
