import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UTMCapture from "@/components/demo/UTMCapture";
import { Suspense } from "react";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-blue-600 text-white text-center py-2 text-[10px] font-black uppercase tracking-[0.2em]">
        Demo Mode: Tracking Active for this Environment
      </div>
      <Navbar />
      
      {/* Search Params need Suspense for Client Components in Server Pages */}
      <Suspense fallback={null}>
        <UTMCapture />
      </Suspense>

      <div className="max-w-4xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Product Image Placeholder */}
          {/* <div className="aspect-square bg-slate-200 rounded-[3rem] shadow-inner flex items-center justify-center p-12">
            <div className="w-full h-full bg-white rounded-[2rem] shadow-2xl flex items-center justify-center text-6xl font-black text-slate-100">
              <svg className="w-32 h-32 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                <path d="M14.12 11.47l-2.09-2.09-1.06 1.06 2.09 2.09 3.18-3.18-1.06-1.06-2.12 2.18zm-4.12 4.53h8v-2h-8v2zm0-8h4v-2h-4v2z"/>
              </svg>
            </div>
          </div> */}

          {/* Product Minimal Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-200">
              Premium Service
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-4 text-slate-950">Professional US <br />Incorporation.</h1>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Complete legal bundle for international founders. One-time payment, lifetime compliance.
            </p>
            
            <div className="text-5xl font-black text-slate-950 mb-10 tracking-tighter">$599</div>

            <form action="/api/create-checkout-session" method="POST">
              <input type="hidden" name="lookup_key" value="premium_inc" />
              <button 
                type="submit" 
                className="btn btn-neutral btn-block btn-lg rounded-2xl h-16 font-black uppercase tracking-widest shadow-2xl shadow-slate-200 hover:-translate-y-1 transition-all"
              >
                Buy Now & Scale
              </button>
            </form>
            
            <p className="mt-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Secure Checkout via Stripe
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
