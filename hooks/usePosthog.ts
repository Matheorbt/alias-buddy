import { useEffect } from 'react'
import { posthog } from '@/lib/posthog'
import { FEATURE_FLAGS, type FeatureFlagKeys } from '@/constants/featureFlags'

export const usePosthog = () => {
  const identify = (userId: string, properties?: Record<string, any>) => {
    posthog.identify(userId, properties)
  }

  const capture = (event: string, properties?: Record<string, any>) => {
    posthog.capture(event, properties)
  }

  const isFeatureEnabled = (flag: FeatureFlagKeys | string) => {
    return posthog.isFeatureEnabled(flag)
  }

  return {
    identify,
    capture,
    isFeatureEnabled,
  }
}

// Hook for initializing PostHog on app load
export const usePosthogInit = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { initPostHog } = require('@/lib/posthog')
      initPostHog()
    }
  }, [])
} 