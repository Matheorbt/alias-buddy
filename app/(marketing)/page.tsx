"use client";

import { usePosthog } from "@/hooks/usePosthog";
import { FEATURE_FLAGS } from "@/constants/featureFlags";
import { Button } from "@/components/ui/Button";

export default function MarketingPage() {
  const { capture, isFeatureEnabled } = usePosthog();

  const handleGetStartedClick = () => {
    capture("get_started_clicked", {
      location: "marketing_page",
      timestamp: Date.now(),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master Your Email Aliases with{" "}
            <span className="text-blue-600">Alias Buddy</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create, manage, and organize unlimited email aliases. 
            Protect your privacy, reduce spam, and take control of your digital identity.
          </p>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={handleGetStartedClick}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {isFeatureEnabled(FEATURE_FLAGS.WELCOME_BANNER) && (
            <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-lg max-w-md mx-auto">
              🎉 Welcome! You're seeing this banner because the welcome-banner feature flag is enabled.
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              📧
            </div>
            <h3 className="text-xl font-semibold mb-2">Unlimited Aliases</h3>
            <p className="text-gray-600">Create as many email aliases as you need for different purposes.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              🔒
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy Protection</h3>
            <p className="text-gray-600">Keep your real email private and reduce unwanted spam.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              📊
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
            <p className="text-gray-600">Organize aliases by category, purpose, or any system that works for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 