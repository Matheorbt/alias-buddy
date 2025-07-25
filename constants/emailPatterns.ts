// Business-specific constants for alias generation

export const BUSINESS_EMAIL_PATTERNS = {
  STANDARD: '{localPart}+{feature}-{date}-{hash}@{domain}',
  NO_DATE: '{localPart}+{feature}-{hash}@{domain}',
} as const

export const BUSINESS_ENVIRONMENTS = [
  { value: 'dev', label: 'Development' },
  { value: 'staging', label: 'Staging' },
  { value: 'prod', label: 'Production' },
  { value: 'test', label: 'Testing' },
] as const

export const BUSINESS_QUANTITY_OPTIONS = [
  { value: 1, label: '1 email' },
  { value: 5, label: '5 emails' },
  { value: 10, label: '10 emails' },
  { value: 100, label: '100 emails' },
] as const

export const BUSINESS_TEMP_DOMAINS = [
  '10minutemail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'mailinator.com',
] as const

// LocalStorage keys for business data
export const BUSINESS_STORAGE_KEYS = {
  GENERATED_ALIASES: 'alias-buddy-generated-emails',
  FORM_SETTINGS: 'alias-buddy-form-settings',
  RECENT_PROJECTS: 'alias-buddy-recent-projects',
} as const 