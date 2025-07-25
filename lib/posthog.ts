import posthog from 'posthog-js'
import { ENV } from '@/constants/env'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init(ENV.POSTHOG_KEY, {
      api_host: ENV.POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: false, // Disable automatic pageview capture for more control
      debug: ENV.NODE_ENV === 'development',
    })
  }
}

export { posthog } 