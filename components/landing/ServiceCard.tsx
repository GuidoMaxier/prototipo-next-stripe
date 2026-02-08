import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  price?: string;
  badge?: string;
  ctaText?: string;
  actionUrl?: string;
  isSecondary?: boolean;
}

export default function ServiceCard({
  title,
  description,
  icon,
  price,
  badge,
  ctaText,
  actionUrl = "/api/create-checkout-session",
  isSecondary = false,
}: ServiceCardProps) {
  return (
    <div className="group relative flex flex-col items-start p-8 bg-base-100 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-content/5 hover:-translate-y-2 overflow-hidden">
      {/* Background glow on hover */}
      <div className={`absolute -right-20 -top-20 w-40 h-40 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${isSecondary ? 'bg-secondary' : 'bg-primary'}`}></div>
      
      <div className={`w-14 h-14 ${isSecondary ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-base-content/60 leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      
      <div className="w-full mt-auto">
        {price ? (
          <form action={actionUrl} method="POST" className="w-full">
            <input type="hidden" name="quantity" value="1" />
            <button type="submit" className="btn btn-neutral btn-block rounded-xl group-hover:btn-primary border-none shadow-lg transition-all font-bold">
              {ctaText || `Start for ${price}`}
            </button>
          </form>
        ) : badge ? (
          <div className="badge badge-outline border-base-content/10 p-4 font-bold w-full h-12 text-xs uppercase tracking-tighter opacity-60">
            {badge}
          </div>
        ) : (
          <button className="btn btn-ghost btn-sm btn-block text-primary font-bold hover:bg-primary/5 rounded-xl">
            {ctaText || "Learn more"} →
          </button>
        )}
      </div>
    </div>
  );
}
