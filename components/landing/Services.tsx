import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 -z-10 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Everything you need to <br className="hidden sm:block" /> 
              <span className="text-primary italic">operate globally.</span>
            </h2>
            <p className="text-lg text-base-content/60 leading-relaxed font-medium">
              We handle the complex paperwork and legal requirements so you can focus on building your product and serving your customers.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="bg-base-300/30 p-1 rounded-2xl flex gap-1">
              <button className="btn btn-sm btn-ghost rounded-xl px-4 font-bold opacity-40">Monthly</button>
              <button className="btn btn-sm btn-primary rounded-xl px-4 font-bold shadow-lg shadow-primary/20">Yearly -20%</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="LLC Formation"
            description="Complete registration in any US state. Includes state fees, registered agent, and all legal documents to start."
            price="$599"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />

          <ServiceCard
            title="Federal Tax ID"
            description="Get your Federal Tax ID (EIN) from the IRS without a Social Security Number. Essential for banking and hiring."
            badge="Included in Pro Package"
            isSecondary={true}
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />

          <ServiceCard
            title="Banking Support"
            description="Guaranteed assistance opening US business bank accounts with Mercury or Relay. Start accepting payments instantly."
            ctaText="Explore Banking"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}
