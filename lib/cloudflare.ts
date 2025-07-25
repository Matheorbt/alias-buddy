// Core Cloudflare utilities - Reusable across SaaS projects
import { ENV } from '@/constants/env'

/**
 * Core Cloudflare configuration
 */
export const cloudflareConfig = {
  accountId: ENV.CLOUDFLARE_ACCOUNT_ID,
  r2: {
    accessKey: ENV.CLOUDFLARE_R2_ACCESS_KEY,
    secretKey: ENV.CLOUDFLARE_R2_SECRET_KEY,
    bucket: ENV.CLOUDFLARE_R2_BUCKET,
    endpoint: `https://${ENV.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  },
  images: {
    accountHash: ENV.CLOUDFLARE_IMAGES_ACCOUNT_HASH,
    baseUrl: `https://imagedelivery.net/${ENV.CLOUDFLARE_IMAGES_ACCOUNT_HASH}`,
  },
} as const

/**
 * Generate optimized image URL for Cloudflare Images
 */
export const getCloudflareImageUrl = (
  imageId: string,
  variant = 'public'
): string => {
  if (!cloudflareConfig.images.accountHash) {
    return imageId // Fallback to original URL
  }
  return `${cloudflareConfig.images.baseUrl}/${imageId}/${variant}`
}

/**
 * Generate R2 object URL
 */
export const getR2Url = (objectKey: string): string => {
  if (!cloudflareConfig.r2.bucket) {
    return objectKey // Fallback to original URL
  }
  return `https://${cloudflareConfig.r2.bucket}.${cloudflareConfig.accountId}.r2.cloudflarestorage.com/${objectKey}`
}

/**
 * Image optimization utilities
 */
export const imageUtils = {
  /**
   * Get optimized image URL based on available services
   */
  getOptimizedUrl: (
    originalPath: string,
    options?: {
      width?: number
      height?: number
      quality?: number
      format?: 'webp' | 'jpeg' | 'png'
    }
  ): string => {
    // If Cloudflare Images is configured, use it
    if (cloudflareConfig.images.accountHash) {
      const params = new URLSearchParams()
      if (options?.width) params.set('w', options.width.toString())
      if (options?.height) params.set('h', options.height.toString())
      if (options?.quality) params.set('q', options.quality.toString())
      if (options?.format) params.set('f', options.format)
      
      const queryString = params.toString()
      return `${getCloudflareImageUrl(originalPath)}${queryString ? `?${queryString}` : ''}`
    }
    
    // If R2 is configured, use it
    if (cloudflareConfig.r2.bucket) {
      return getR2Url(originalPath)
    }
    
    // Fallback to original path
    return originalPath
  },
  
  /**
   * Check if Cloudflare services are available
   */
  isAvailable: {
    r2: Boolean(cloudflareConfig.r2.bucket && cloudflareConfig.accountId),
    images: Boolean(cloudflareConfig.images.accountHash),
  },
} as const

export type CloudflareConfig = typeof cloudflareConfig
export type ImageUtils = typeof imageUtils 