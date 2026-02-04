import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/tracking/MetaPixel";
import GoogleAnalytics from "@/components/tracking/GoogleAnalytics";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "US Incorporation | All-in-one Solution",
  description: "Launch your US Business with professional bookkeeping and tax compliance.",
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
