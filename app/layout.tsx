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
  title: "Alias Buddy - Email Alias Generator for Developers",
  description: "🚀 Generate unique email aliases for dev testing instantly! Clean UI, works offline, privacy-first. Perfect for developers who value their time. Free & open-source.",
  keywords: ["email", "alias", "generator", "development", "testing", "privacy", "developer tools", "dev tools", "email testing", "alias generator"],
  authors: [{ name: "Matheo Robert", url: "https://x.com/matheorbt_" }],
  creator: "Matheo Robert",
  publisher: "Matheo Robert",
  applicationName: "Alias Buddy",
  category: "Developer Tools",
  classification: "Productivity Tool",
  appleWebApp: {
    capable: true,
    title: "Alias Buddy",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Alias Buddy - Email Alias Generator for Developers",
    description: "🚀 Generate unique email aliases for dev testing instantly! Clean UI, works offline, privacy-first. Perfect for developers who value their time.",
    type: "website",
    siteName: "Alias Buddy",
    locale: "en_US",
    url: "https://alias-buddy.com",
    images: [
      {
        url: "https://alias-buddy.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alias Buddy - Email Alias Generator for Developers",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@matheorbt_",
    creator: "@matheorbt_",
    title: "Alias Buddy - Email Alias Generator for Developers",
    description: "🚀 Generate unique email aliases for dev testing instantly! Clean UI, works offline, privacy-first. Perfect for developers who value their time.",
    images: [
      {
        url: "https://alias-buddy.com/twitter-image.png",
        alt: "Alias Buddy - Email Alias Generator for Developers",
        width: 1200,
        height: 600,
      },
    ],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://alias-buddy.com",
  },
  manifest: "/manifest.json",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Alias Buddy",
  "description": "Generate unique email aliases for development testing. Clean UI, works offline, privacy-first.",
  "url": "https://alias-buddy.com",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "permissions": "none",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "Matheo Robert",
    "url": "https://x.com/matheorbt_"
  },
  "creator": {
    "@type": "Person", 
    "name": "Matheo Robert",
    "url": "https://x.com/matheorbt_"
  },
  "datePublished": "2024-12-20",
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "keywords": "email alias generator, developer tools, privacy, email testing",
  "screenshot": "https://alias-buddy.com/og-image.png"
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
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
