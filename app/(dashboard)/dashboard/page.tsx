import { db } from "@/db";
import { ordersTable, projects, visitsTable } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ensureDemoProject } from "@/app/actions/setup";
import CopyButton from "@/components/dashboard/CopyButton";

async function DashboardContent() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id || !user?.email) {
    return null;
  }

  // SAEZ: Ensure the user has at least one project for the demo to work
  await ensureDemoProject(user.email);

  // 1. Fetch real orders for this user
  const orders = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.userId, user.id))
    .orderBy(desc(ordersTable.createdAt));

  // 2. Fetch visits for conversion rate
  const userProjects = await db.select().from(projects).where(eq(projects.userId, user.id));
  const projectIds = userProjects.map(p => p.id);
  
  const visits = projectIds.length > 0 
    ? await db.select().from(visitsTable).where(sql`${visitsTable.projectId} IN ${projectIds}`)
    : [];

  const totalVisits = visits.length;
  const totalOrders = orders.length;
  const conversionRate = totalVisits > 0 ? ((totalOrders / totalVisits) * 100).toFixed(2) : "0.00";

  // Quick attribution summary
  const metaOrders = orders.filter(o => o.utmSource?.toLowerCase().includes('meta') || o.fbclid).length;
  const googleOrders = orders.filter(o => o.utmSource?.toLowerCase().includes('google') || o.gclid).length;

  const firstProject = userProjects[0];
  const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const embedCode = `<script \n  src="${domain}/tracker.js" \n  data-client-id="${firstProject?.apiKey}" \n  async\n></script>`;

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full translate-x-12 -translate-y-12"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Total Visits</p>
          <p className="text-3xl font-black text-white italic tracking-tighter">{totalVisits}</p>
          <div className="mt-4 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Real-time signals</span>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Conversion Rate</p>
          <p className="text-3xl font-black text-blue-500 italic tracking-tighter">{conversionRate}%</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest italic">Visits to Paid</span>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Total Orders</p>
          <p className="text-3xl font-black text-white italic tracking-tighter">{totalOrders}</p>
          <div className="mt-4 flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
            Meta: {metaOrders} | Google: {googleOrders}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Data Health</p>
            <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                <p className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">Optimal</p>
            </div>
            <p className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pixel API ACTIVE</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Attribution Logs */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/30">
            <h2 className="text-lg font-black italic uppercase tracking-tighter text-white font-mono">/conversion_attribution_logs</h2>
            <button className="btn btn-ghost btn-xs text-blue-500 font-black uppercase tracking-widest italic">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra-dark w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 text-left">Event ID</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 text-left">Marketing Source</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 text-left">Revenue</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/30 text-left">Verification</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => {
                    const isMeta = order.utmSource?.toLowerCase().includes('meta') || order.fbclid;
                    const isGoogle = order.utmSource?.toLowerCase().includes('google') || order.gclid;
                    const sourceName = isMeta ? 'META ADS' : isGoogle ? 'GOOGLE ADS' : 'DIRECT / ORGANIC';
                    const sourceColor = isMeta ? 'text-blue-400 bg-blue-400/10' : isGoogle ? 'text-green-400 bg-green-400/10' : 'text-slate-400 bg-slate-400/10';

                    return (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                          <span className="font-mono text-[10px] text-white/40 group-hover:text-white/80 transition-colors">#{order.stripeSessionId?.slice(-12) || order.id}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">{sourceName}</span>
                            <div className="flex gap-2 items-center mt-1">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-tighter ${sourceColor}`}>{order.utmSource || 'standard'}</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight italic">{order.utmMedium || 'visit'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 font-mono text-sm font-bold text-white">
                          ${(order.amount / 100).toFixed(2)}
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                            Finalized
                          </span>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/20 italic">Waiting for conversion signals...</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col h-full overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Setup Signal Tracking</h3>
          </div>

          <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
            Copia el siguiente script y pégalo lo más alto posible en el <code className="text-blue-400 px-1 font-bold">&lt;head&gt;</code> de tu sitio web (o antes del final del <code className="text-blue-400 px-1 font-bold">&lt;body&gt;</code>).
          </p>

          <div className="bg-black/60 rounded-2xl p-4 border border-white/5 relative group/code mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 font-mono">tracker.js / snippet</span>
              <CopyButton text={embedCode} />
            </div>
            <pre className="text-[10px] text-blue-400/80 font-mono overflow-x-auto pb-2 scrollbar-hide select-all">
              {embedCode}
            </pre>
          </div>

          <div className="space-y-4 mt-auto">
            <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-blue-500 text-xs font-black italic">01</div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-white uppercase tracking-tight mb-1">Pixel Identification</p>
                <p className="text-[10px] text-slate-500 font-medium">Usamos el atributo <code className="text-slate-400">data-client-id</code> para vincular las señales de tu web con este Dashboard automáticamente.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-blue-500 text-xs font-black italic">02</div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-white uppercase tracking-tight mb-1">Real-time Sync</p>
                <p className="text-[10px] text-slate-500 font-medium">Una vez instalado, verás las visitas aparecer en tiempo real arriba.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default async function DashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-600 rounded-sm"></span>
            Performance Overview
          </h1>
          <p className="text-slate-400 font-medium mt-2">Correlating Stripe revenue with UTM attribution signals.</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Last Sync: Just now
           </div>
        </div>
      </div>

      <Suspense fallback={
        <div className="space-y-8 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-900/50 border border-white/10 rounded-3xl"></div>
            ))}
          </div>
          <div className="h-64 bg-slate-900/50 border border-white/10 rounded-3xl"></div>
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
