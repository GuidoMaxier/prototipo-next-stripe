import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/tracking/MetaPixel";
import GoogleAnalytics from "@/components/tracking/GoogleAnalytics";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "AdTracker | Scientific Attribution for Stripe",
  description: "Link every Stripe payment to its original ad click. Feed the AI with real profit data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
   
        <body className="min-h-screen">
          <Suspense fallback={null}>
            <MetaPixel />
            <GoogleAnalytics />
          </Suspense>
          {children}
        </body>
    </html>
  );
}
