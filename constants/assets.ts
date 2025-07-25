// Business-specific asset paths for Alias Buddy
import { imageUtils } from '@/lib/cloudflare'

/**
 * Business assets - specific to Alias Buddy
 */
export const BUSINESS_ASSETS = {
  // Main brand assets
  LOGO: imageUtils.getOptimizedUrl('/logo_alias_buddy.png'),
  
  // Social media images
  OG_IMAGE: imageUtils.getOptimizedUrl('/og-image.png'),
  TWITTER_IMAGE: imageUtils.getOptimizedUrl('/twitter-image.png'),
  
  // PWA Icons (optimized versions)
  ICONS: {
    FAVICON: '/favicon.ico', // Keep favicon local for browser compatibility
    PWA_72: imageUtils.getOptimizedUrl('/icon-72x72.png'),
    PWA_96: imageUtils.getOptimizedUrl('/icon-96x96.png'),
    PWA_128: imageUtils.getOptimizedUrl('/icon-128x128.png'),
    PWA_144: imageUtils.getOptimizedUrl('/icon-144x144.png'),
    PWA_152: imageUtils.getOptimizedUrl('/icon-152x152.png'),
    PWA_192: imageUtils.getOptimizedUrl('/icon-192x192.png'),
    PWA_384: imageUtils.getOptimizedUrl('/icon-384x384.png'),
    PWA_512: imageUtils.getOptimizedUrl('/icon-512x512.png'),
  },
} as const

/**
 * Asset helpers for the business
 */
export const assetHelpers = {
  /**
   * Get logo (served through Cloudflare CDN)
   */
  getLogo: () => imageUtils.getOptimizedUrl('/logo_alias_buddy.png'),
  
  /**
   * Get social image (served through Cloudflare CDN)
   */
  getSocialImage: (platform: 'og' | 'twitter') => {
    const imagePath = platform === 'twitter' ? '/twitter-image.png' : '/og-image.png'
    return imageUtils.getOptimizedUrl(imagePath)
  },
} as const

export type BusinessAssets = typeof BUSINESS_ASSETS
export type AssetHelpers = typeof assetHelpers 