// Core feature flags that will be common across SaaS templates
export const CORE_FEATURE_FLAGS = {
  WELCOME_BANNER: 'welcome-banner',
  MAINTENANCE_MODE: 'maintenance-mode',
  BETA_FEATURES: 'beta-features',
} as const

// Business specific feature flags for alias-buddy
export const BUSINESS_FEATURE_FLAGS = {
  // Add your alias-buddy specific feature flags here
  // NEW_ALIAS_EDITOR: 'new-alias-editor',
  // BULK_OPERATIONS: 'bulk-operations',
} as const

export const FEATURE_FLAGS = {
  ...CORE_FEATURE_FLAGS,
  ...BUSINESS_FEATURE_FLAGS,
} as const

export type FeatureFlagKeys = keyof typeof FEATURE_FLAGS 