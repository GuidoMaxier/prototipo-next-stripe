import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    // We are now using dynamic (on-the-fly) pricing.
    // The application code is the source of truth.
    return NextResponse.json({
      publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      unitAmount: 59900, // $599.00
      currency: "usd",
    });
  } catch (error) {
    console.error("Error fetching config:", error);
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 }
    );
  }
}
