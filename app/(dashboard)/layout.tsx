import Link from "next/link";
import SidebarNav from "@/components/dashboard/SidebarNav";
import { Suspense } from "react";
import LogoutButton from "@/components/auth/LogoutButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function SidebarContent() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const user = session.user;

  return (
    <div className="flex flex-col h-full is-drawer-close:overflow-visible">
      {/* Logo Section */}
      <div className="h-16 flex items-center shrink-0 is-drawer-close:justify-center is-drawer-open:px-6">
        <Link href="/" className="flex items-center is-drawer-open:gap-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] shrink-0">
            A
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic is-drawer-close:hidden whitespace-nowrap">
            AdTracker
          </span>
        </Link>
      </div>

      <div className="divider opacity-5 my-0 px-4 is-drawer-close:hidden"></div>

      {/* Navigation Links */}
      <div className="flex-grow py-4 is-drawer-close:overflow-visible overflow-y-auto is-drawer-close:overflow-y-visible">
        <SidebarNav />
      </div>

      {/* User Profile Footer */}
      <div className="p-4 bg-slate-950/30 border-t border-white/5 shrink-0 is-drawer-close:overflow-visible">
        <div className="flex items-center is-drawer-close:justify-center is-drawer-open:gap-3 is-drawer-open:px-2 py-1">
          <div className="avatar h-10 w-10 border border-white/10 rounded-xl overflow-hidden bg-slate-800 shrink-0">
            <img 
              src={user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
              alt={user.name || "User"} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 is-drawer-close:hidden">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] font-medium text-slate-500 truncate italic">Plan: Enterprise</p>
          </div>
        </div>
        
        <div className="mt-2 is-drawer-close:hidden">
          <LogoutButton variant="sidebar" />
        </div>
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
    <div className="drawer lg:drawer-open min-h-screen bg-slate-950">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* DRAWER CONTENT: Navbar + Main Area */}
      <div className="drawer-content flex flex-col min-h-screen">
        
        {/* GLOBAL NAVBAR (Mobile + Desktop Toggle) */}
        <nav className="navbar h-16 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-30 px-4 gap-4">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost text-slate-400">
              {/* Sidebar toggle icon (Custom for AdTracker) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M9 4v16" />
                <path d="M14 10l2 2l-2 2" />
              </svg>
            </label>
          </div>
          
          <div className="flex-1">
             <Link href="/" className="lg:hidden">
               <span className="text-xl font-black tracking-tighter text-white uppercase italic">AdTracker</span>
             </Link>
          </div>

          <div className="flex-none hidden sm:block">
            <div className="badge badge-outline border-blue-500/30 text-blue-400 font-bold uppercase text-[9px] tracking-widest px-3 py-3">
               Production Signal Active
            </div>
          </div>
        </nav>

        {/* MAIN DASHBOARD AREA */}
        <main className="flex-grow relative overflow-hidden flex flex-col">
            {/* Background Grid */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10 flex-grow p-4 md:p-8 lg:p-10">
                {children}
            </div>
        </main>
      </div>

      {/* DRAWER SIDEBAR: The collapsible menu */}
      <div className="drawer-side z-40 is-drawer-close:overflow-visible overflow-y-auto">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        
        <div className="flex min-h-full flex-col bg-slate-900 border-r border-white/10 transition-all duration-300 is-drawer-close:w-16 lg:is-drawer-open:w-72 is-drawer-close:overflow-visible">
          <Suspense fallback={<div className="p-8 animate-pulse text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Interface...</div>}>
            <SidebarContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
