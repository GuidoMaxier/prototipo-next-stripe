import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-base-100 py-24 sm:py-32">
      {/* Elementos decorativos estilo Webflow (background blobs/gradients) */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:top-[-20%]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#635bff15] to-[#00d4ff10] opacity-40"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-base-content/60 ring-1 ring-base-content/10 hover:ring-base-content/20 transition-all cursor-default uppercase tracking-widest font-bold bg-base-200/50">
              New: Delaware LLC Fast-Track
            </span>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-base-content sm:text-7xl font-sans">
            Launch your company <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              without the friction.
            </span>
          </h1>
          
          <p className="mt-8 text-lg leading-8 text-base-content/70 max-w-2xl mx-auto">
            The all-in-one platform for international founders to incorporate, manage, and scale their US business. 
            Join 5,000+ companies already operating globally.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="btn btn-primary btn-lg rounded-2xl px-10 shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-white font-bold"
            >
              Start My Incorporation
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/pricing" className="text-sm font-bold leading-6 text-base-content hover:text-primary transition-colors flex items-center gap-1 group">
              View Pricing <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Social Proof / Trusted By */}
          <div className="mt-20 border-t border-base-content/5 pt-10">
            <p className="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-8 text-center">
              Trusted by founders from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale contrast-125">
              {/* Placeholders para logos */}
              <div className="font-black text-2xl tracking-tighter">MERCURY</div>
              <div className="font-black text-2xl tracking-tighter italic">Stripe</div>
              <div className="font-black text-2xl tracking-tighter">BREX</div>
              <div className="font-black text-2xl tracking-tighter">Remote</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}
