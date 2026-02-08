import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { visitsTable, projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 401 });
    }

    // Verify project exists
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.apiKey, apiKey))
      .get();

    if (!project) {
      return NextResponse.json({ error: "Invalid API Key" }, { status: 403 });
    }

    const data = await req.json();

    // Record visit linked to project
    await db.insert(visitsTable).values({
      projectId: project.id,
      utmSource: data.utmSource || null,
      utmMedium: data.utmMedium || null,
      utmCampaign: data.utmCampaign || null,
      fbclid: data.fbclid || null,
      gclid: data.gclid || null,
      path: data.path || "/",
    });

    return NextResponse.json({ success: true }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    });
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
