import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const priceId = process.env.PRICE_INCORPORATION || process.env.PRICE;
    if (!priceId) {
      throw new Error("Stripe Price ID is not configured (PRICE_INCORPORATION)");
    }
    const price = await stripe.prices.retrieve(priceId);

    return NextResponse.json({
      publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      unitAmount: price.unit_amount,
      currency: price.currency,
    });
  } catch (error) {
    console.error("Error fetching config:", error);
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 }
    );
  }
}
