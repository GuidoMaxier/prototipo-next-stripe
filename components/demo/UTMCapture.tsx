"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { recordVisit } from "@/app/actions/tracking";

export default function UTMCapture() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isNewSignal, setIsNewSignal] = useState(false);

  useEffect(() => {
    const data = {
      utmSource: searchParams.get("utm_source"),
      utmMedium: searchParams.get("utm_medium"),
      utmCampaign: searchParams.get("utm_campaign"),
      fbclid: searchParams.get("fbclid"),
      gclid: searchParams.get("gclid"),
      gadSource: searchParams.get("gad_source"),
      gbraid: searchParams.get("gbraid"),
      wbraid: searchParams.get("wbraid"),
      timestamp: new Date().toISOString(),
      path: pathname,
    };

    const hasParams = Object.values(data).some(val => val !== null && typeof val === 'string');

    if (hasParams) {
      console.log("--> AdTracker Capturando Señal:", data);
      localStorage.setItem("adtracker_session", JSON.stringify(data));
      setTrackingData(data);
      setIsNewSignal(true);
      
      // Auto-clear notification after 5 seconds but keep data
      setTimeout(() => setIsNewSignal(false), 5000);
    } else {
      // If no params, we check if we have a "last known" session for context, 
      // but we don't treat it as a new campaign hit in the UI
      const saved = localStorage.getItem("adtracker_session");
      if (saved) setTrackingData(JSON.parse(saved));
      setIsNewSignal(false);
    }

    // ALWAYS record the visit in DB (regardless of UTMs) for statistics
    recordVisit({
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      fbclid: data.fbclid,
      gclid: data.gclid,
      path: data.path,
    });

  }, [searchParams, pathname]);

  const clearTracking = () => {
    localStorage.removeItem("adtracker_session");
    setTrackingData(null);
    setIsNewSignal(false);
  };

  // Only show the UI if it's a NEW signal or if the user wants to see the active one
  if (!trackingData || (!isNewSignal && !searchParams.get('debug'))) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] bg-slate-900 border border-blue-500/50 p-4 rounded-xl shadow-2xl max-w-xs animate-in slide-in-from-bottom-5 duration-500">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2 text-blue-400">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest">AdTracker {isNewSignal ? 'Signal Captured' : 'Active Attribution'}</span>
        </div>
        <button 
          onClick={clearTracking}
          className="text-[9px] font-bold text-slate-500 hover:text-white uppercase tracking-tighter bg-white/5 px-2 py-0.5 rounded"
        >
          Clear
        </button>
      </div>
      <div className="text-[10px] space-y-1 font-mono text-slate-400">
        {trackingData.utmSource && <div>Source: <span className="text-white">{trackingData.utmSource}</span></div>}
        {trackingData.fbclid && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <div>FB Click ID: <span className="text-white">***{trackingData.fbclid.slice(-6)}</span></div>
          </div>
        )}
        {trackingData.gclid && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
            <div>G Click ID: <span className="text-white">***{trackingData.gclid.slice(-6)}</span></div>
          </div>
        )}
        {trackingData.gadSource && <div>Google Ads Source: <span className="text-white">Active</span></div>}
      </div>
    </div>
  );
}
