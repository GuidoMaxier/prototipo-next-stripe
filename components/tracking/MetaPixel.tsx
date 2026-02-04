"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This is where the base Meta Pixel script would go
    // For now, we just define the function to avoid errors if called
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}
