import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/core/AnalyticsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alias Buddy - Manage Your Email Aliases",
  description: "The ultimate tool to create, manage, and organize your email aliases efficiently.",
  keywords: ["email", "alias", "management", "privacy", "organization"],
  authors: [{ name: "Alias Buddy Team" }],
  creator: "Alias Buddy",
  openGraph: {
    title: "Alias Buddy - Manage Your Email Aliases",
    description: "The ultimate tool to create, manage, and organize your email aliases efficiently.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
