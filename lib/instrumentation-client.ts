import { initPostHog } from './posthog'

// Initialize PostHog on client side
if (typeof window !== 'undefined') {
  initPostHog()
}
