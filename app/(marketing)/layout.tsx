import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div className="h-20 w-full bg-slate-950/80 animate-pulse border-b border-white/5" />}>
        <Navbar />
      </Suspense>
      {children}
    </>
  );
}
