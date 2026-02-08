import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { ordersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

async function ProfileContent() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  // Fetch real orders for this user
  const orders = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.userId, user.id!));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Card */}
      <div className="lg:col-span-1">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
                <img 
                  src={user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                  alt={user.name || "Avatar"} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-black tracking-tight text-white mb-1">
              {user.name}
            </h2>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-6">
              Verified Entrepreneur
            </p>
            
            <div className="w-full space-y-4 pt-6 border-t border-white/5">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Address</span>
                <span className="text-sm font-bold text-slate-300 truncate w-full">{user.email}</span>
              </div>
              
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Account Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                  <span className="text-sm font-bold text-green-500 uppercase tracking-tighter italic">Active Priority</span>
                </div>
              </div>
            </div>
            
            <button className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Info */}
      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Session Data</p>
            <p className="text-2xl font-black text-white italic uppercase tracking-tighter">Authorized</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-400">
                NextAuth v5 Secure Entry
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Security Level</p>
            <p className="text-2xl font-black text-green-500 italic uppercase tracking-tighter">High</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                2FA Recommended
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h3 className="text-lg font-black italic uppercase tracking-tighter text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white uppercase tracking-tighter">Incorporation Purchase</p>
                                <p className="text-[10px] font-medium text-slate-500 italic">#{order.stripeSessionId?.slice(-12)}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black text-white">${(order.amount / 100).toFixed(2)}</p>
                            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{order.status}</p>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && (
                    <p className="text-center text-slate-500 py-10 italic uppercase font-black tracking-widest text-[10px]">No activity recorded</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default async function ProfilePage() {
  return (
    <div className="space-y-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white flex items-center gap-3">
                    <span className="w-2 h-8 bg-indigo-600 rounded-sm"></span>
                    Identity & Security
                </h1>
                <p className="text-slate-400 font-medium mt-2">Manage your account credentials and verification status.</p>
            </div>
        </div>

        <Suspense fallback={
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
                <div className="lg:col-span-1 h-[400px] bg-slate-900/50 border border-white/10 rounded-3xl"></div>
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-32">
                        <div className="bg-slate-900/50 border border-white/10 rounded-3xl"></div>
                        <div className="bg-slate-900/50 border border-white/10 rounded-3xl"></div>
                    </div>
                    <div className="h-64 bg-slate-900/50 border border-white/10 rounded-3xl"></div>
                </div>
            </div>
        }>
            <ProfileContent />
        </Suspense>
    </div>
  );
}
