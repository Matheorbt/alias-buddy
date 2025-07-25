"use client";

import { useEffect } from "react";
import Image from "next/image";
import { usePosthog } from "@/hooks/usePosthog";
import { FEATURE_FLAGS } from "@/constants/featureFlags";
import AliasGeneratorLayout from "@/components/business/AliasGeneratorLayout";
import MobileOptimizations from "@/components/business/MobileOptimizations";
import SocialShareButtons from "@/components/business/SocialShareButtons";

export default function HomePage() {
  const { capture, isFeatureEnabled, identify } = usePosthog();

  useEffect(() => {
    // Track page view
    capture("dashboard_viewed", {
      timestamp: Date.now(),
    });

    // Identify user (in real app, this would be after authentication)
    identify("dev_user_123", {
      user_type: "developer",
      plan: "free",
    });
  }, [capture, identify]);

  return (
    <MobileOptimizations>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <SocialShareButtons />
          </div>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Image 
                src="/logo_alias_buddy.png" 
                alt="Alias Buddy Logo" 
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Alias Buddy
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            🚀 Generate unique email aliases for your development testing. 
            Clean, fast, and developer-friendly.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">✨ Works Offline</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">🔒 Privacy-First</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">📱 PWA Ready</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full">🆓 Free to Use</span>
          </div>
        </div>

        {/* Main Generator */}
        <AliasGeneratorLayout />

        {/* Feature Flag Demo */}
        {isFeatureEnabled(FEATURE_FLAGS.BETA_FEATURES) && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🚀</span>
                <span className="font-semibold text-blue-800">Beta Features Enabled</span>
              </div>
              <p className="text-blue-700">
                You have access to experimental features! This is controlled by the beta-features flag in PostHog.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with ❤️ for developers who value their time and privacy by{" "}
            <a 
              href="https://x.com/matheorbt_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
            >
              @matheorbt_
            </a>
          </p>
        </div>
      </div>
    </div>
    </MobileOptimizations>
  );
}
