// Environment variables mapping for better type safety and organization
export const ENV = {
  // Core analytics & monitoring
  POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  
  // Authentication (when you add it)
  // SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  
  // Email service (when you add it)
  // RESEND_API_KEY: process.env.RESEND_API_KEY!,
  
  // Other services
  // SENTRY_DSN: process.env.SENTRY_DSN,
  // CHATWOOT_TOKEN: process.env.CHATWOOT_TOKEN,
  
  // App specific
  NODE_ENV: process.env.NODE_ENV || 'development',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://alias-buddy.com',
} as const

// Type for environment validation
export type Environment = typeof ENV 