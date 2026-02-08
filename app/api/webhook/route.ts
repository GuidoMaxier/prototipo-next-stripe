import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { db } from "@/db";
import { ordersTable } from "@/db/schema";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (signature) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log("💰 Payment received! Persisting attribution data...");
    
    // Extract data from metadata
    const metadata = session.metadata || {};
    
    await db.insert(ordersTable).values({
      stripeSessionId: session.id,
      projectId: metadata.projectId || null, // Capture projectId from Stripe
      userId: metadata.userId || null,
      amount: session.amount_total || 0,
      status: "paid",
      // Attribution Data
      utmSource: metadata.utm_source || null,
      utmMedium: metadata.utm_medium || null,
      utmCampaign: metadata.utm_campaign || null,
      fbclid: metadata.fbclid || null,
      gclid: metadata.gclid || null,
    });
  }

  return NextResponse.json({ received: true });
}
