// Core routes that will be common across SaaS templates
export const CORE_ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const

// Business specific routes for alias-buddy
export const BUSINESS_ROUTES = {
  // Add your alias-buddy specific routes here
  // ALIASES: '/aliases',
  // CREATE_ALIAS: '/aliases/create',
  // MANAGE_ALIAS: '/aliases/manage',
} as const

// API routes
export const API_ROUTES = {
  AUTH: '/api/auth',
  USER: '/api/user',
  // Add business specific API routes
  // ALIASES: '/api/aliases',
} as const

export const ROUTES = {
  ...CORE_ROUTES,
  ...BUSINESS_ROUTES,
  API: API_ROUTES,
} as const

export type RouteKeys = keyof typeof ROUTES 