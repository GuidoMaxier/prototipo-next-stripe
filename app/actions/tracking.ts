"use server";

import { db } from "@/db";
import { visitsTable } from "@/db/schema";

export async function recordVisit(data: {
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  fbclid?: string | null;
  gclid?: string | null;
  path: string;
}) {
  try {
    await db.insert(visitsTable).values({
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      fbclid: data.fbclid,
      gclid: data.gclid,
      path: data.path,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to record visit:", error);
    return { success: false };
  }
}
