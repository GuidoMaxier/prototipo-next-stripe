import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SaasHero from "@/components/landing/saas/Hero";
import TrackerVisual from "@/components/landing/saas/TrackerVisual";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-primary/30">
      <Navbar />
      <SaasHero />
      <TrackerVisual />
      
      {/* SaaS Middle Section: The Problem */}
      <section className="py-24 px-6 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Clicks are fine. <span className="text-primary">Revenue is better.</span></h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-12">
            Most ad platforms only track "conversions" based on thank-you pages. 
            This leads to garbage data when people abandon checkout or payments fail. 
            <b>AdTracker</b> links the final Stripe payment to the exact click that caused it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center text-sm">✕</span>
                Standard Pixels
              </h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>• Lost data from iOS 14.5+</li>
                <li>• Tracks visits, not successful payments</li>
                <li>• 20-30% discrepancy with real bank data</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">✓</span>
                AdTracker Engine
              </h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li>• Server-side CAPI integration</li>
                <li>• 100% correlation with Stripe IDs</li>
                <li>• Feeds pure profit data to AI algorithms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
