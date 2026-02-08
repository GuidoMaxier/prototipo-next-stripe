"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMCapture() {
  const searchParams = useSearchParams();
  const [trackingData, setTrackingData] = useState<any>(null);

  useEffect(() => {
    const data = {
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      fbclid: searchParams.get("fbclid"),
      gclid: searchParams.get("gclid"),
      timestamp: new Date().toISOString(),
    };

    if (data.utm_source || data.fbclid || data.gclid) {
      console.log("🎯 AdTracker Capturando Señal:", data);
      localStorage.setItem("adtracker_session", JSON.stringify(data));
      setTrackingData(data);
    } else {
      const saved = localStorage.getItem("adtracker_session");
      if (saved) setTrackingData(JSON.parse(saved));
    }
  }, [searchParams]);

  if (!trackingData) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] bg-slate-900 border border-blue-500/50 p-4 rounded-xl shadow-2xl max-w-xs animate-in slide-in-from-bottom-5 duration-500">
      <div className="flex items-center gap-2 mb-2 text-blue-400">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-widest">AdTracker Signal Detected</span>
      </div>
      <div className="text-[10px] space-y-1 font-mono text-slate-400">
        {trackingData.utm_source && <div>Source: <span className="text-white">{trackingData.utm_source}</span></div>}
        {trackingData.fbclid && <div>FB Click ID: <span className="text-white">***{trackingData.fbclid.slice(-6)}</span></div>}
        {trackingData.gclid && <div>G Click ID: <span className="text-white">***{trackingData.gclid.slice(-6)}</span></div>}
      </div>
    </div>
  );
}
