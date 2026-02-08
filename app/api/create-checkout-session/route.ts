import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const quantity = parseInt(formData.get("quantity") as string) || 1;

    const domainURL = process.env.DOMAIN || "http://localhost:3000";

    // Read tracking data from cookie
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    const trackingDataRaw = cookies["adtracker_session"];
    let trackingMetadata = {};
    let projectId: string | null = null;
    
    if (trackingDataRaw) {
      try {
        const decoded = JSON.parse(decodeURIComponent(trackingDataRaw));
        
        // Find project by apiKey
        if (decoded.apiKey) {
          const project = await db
            .select()
            .from(projects)
            .where(eq(projects.apiKey, decoded.apiKey))
            .get();
          if (project) projectId = project.id;
        }

        trackingMetadata = {
          utm_source: decoded.utmSource || "",
          utm_medium: decoded.utmMedium || "",
          utm_campaign: decoded.utmCampaign || "",
          fbclid: decoded.fbclid || "",
          gclid: decoded.gclid || "",
          gad_source: decoded.gadSource || "",
        };
      } catch (e) {
        console.error("Failed to parse tracking cookie", e);
      }
    }

    // Get session to link user
    const authSession = await auth();
    const userId = authSession?.user?.id;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.PRICE_INCORPORATION!,
          quantity: quantity,
        },
      ],
      metadata: {
        userId: userId || "",
        projectId: projectId || "", // Important for multi-tenant
        ...trackingMetadata
      },
      success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled`,
      payment_method_types: ["card"],
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
