import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/core/AnalyticsProvider";
import PWAInstallPrompt from "@/components/core/PWAInstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alias Buddy - Email Alias Generator",
  description: "Generate unique email aliases for development testing. Clean, fast, and developer-friendly.",
  keywords: ["email", "alias", "generator", "development", "testing", "privacy", "developer tools"],
  authors: [{ name: "Matheo Robert", url: "https://x.com/matheorbt_" }],
  creator: "Matheo Robert",
  applicationName: "Alias Buddy",
  appleWebApp: {
    capable: true,
    title: "Alias Buddy",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Alias Buddy - Email Alias Generator",
    description: "Generate unique email aliases for development testing. Clean, fast, and developer-friendly.",
    type: "website",
    siteName: "Alias Buddy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alias Buddy - Email Alias Generator",
    description: "Generate unique email aliases for development testing. Clean, fast, and developer-friendly.",
    creator: "@matheorbt_",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Alias Buddy" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider>
          {children}
          <PWAInstallPrompt />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
