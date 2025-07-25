// Core Cloudflare CDN utilities - Reusable across SaaS projects

/**
 * Simple image optimization utilities for CDN
 * No additional services needed - just works with Cloudflare proxy
 */
export const imageUtils = {
  /**
   * Get standard image URL (served through Cloudflare CDN when proxy is enabled)
   */
  getOptimizedUrl: (originalPath: string): string => {
    // Return original path - Cloudflare CDN will handle caching automatically
    return originalPath
  },
  
  /**
   * Check if Cloudflare CDN is working
   * (You can check response headers for 'cf-ray' to verify)
   */
  isAvailable: {
    cdn: true, // Always available when domain is proxied through Cloudflare
  },
} as const

/**
 * CDN cache utilities
 */
export const cdnUtils = {
  /**
   * Add cache-friendly headers for static assets
   */
  getCacheHeaders: (assetType: 'image' | 'font' | 'css' | 'js' = 'image') => {
    const cacheConfig = {
      image: { maxAge: 2592000, staleWhileRevalidate: 86400 }, // 30 days
      font: { maxAge: 31536000, staleWhileRevalidate: 86400 },  // 1 year
      css: { maxAge: 2592000, staleWhileRevalidate: 86400 },    // 30 days
      js: { maxAge: 2592000, staleWhileRevalidate: 86400 },     // 30 days
    }
    
    const config = cacheConfig[assetType]
    return {
      'Cache-Control': `public, max-age=${config.maxAge}, stale-while-revalidate=${config.staleWhileRevalidate}`,
    }
  },
} as const

export type ImageUtils = typeof imageUtils
export type CdnUtils = typeof cdnUtils 