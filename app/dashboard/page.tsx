"use client";

import { usePosthog } from "@/hooks/usePosthog";
import { FEATURE_FLAGS } from "@/constants/featureFlags";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { capture, isFeatureEnabled } = usePosthog();

  const handleCreateAliasClick = () => {
    capture("create_alias_clicked", {
      location: "dashboard",
      timestamp: Date.now(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Email Aliases
          </h1>
          <p className="text-gray-600">
            Manage and organize your email aliases
          </p>
        </div>

        {/* Dashboard Content - This is business logic for alias-buddy */}
        <div className="grid gap-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-gray-600">Active Aliases</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">3,247</div>
              <div className="text-gray-600">Emails Received</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-gray-600">Spam Blocked</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Aliases</h2>
                <Button onClick={handleCreateAliasClick}>
                  Create New Alias
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-4">📧</div>
                <p className="text-lg font-medium mb-2">No aliases yet</p>
                <p className="text-sm">Create your first email alias to get started</p>
              </div>
            </div>
          </div>

          {/* Feature Flag Demo */}
          {isFeatureEnabled(FEATURE_FLAGS.BETA_FEATURES) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">🚀</span>
                <span className="font-medium text-blue-800">Beta Features Enabled</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                You have access to experimental features! This is controlled by the beta-features flag.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 