// Core email utilities - reusable across SaaS projects

export const EMAIL_MAX_LENGTH = 254 // RFC standard
export const LOCAL_PART_MAX_LENGTH = 64 // Part before @

/**
 * Validates if a string is a valid email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= EMAIL_MAX_LENGTH
}

/**
 * Sanitizes a string to be email-friendly (for alias parts)
 */
export const sanitizeForEmail = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric with dash
    .replace(/-+/g, '-') // Replace multiple dashes with single
    .replace(/^-|-$/g, '') // Remove leading/trailing dashes
}

/**
 * Generates a short hash (8 characters)
 */
export const generateShortHash = (): string => {
  return Math.random().toString(36).substr(2, 8)
}

/**
 * Formats current date as YYYYMMDD
 */
export const formatDate = (): string => {
  const now = new Date()
  return now.getFullYear().toString() + 
         (now.getMonth() + 1).toString().padStart(2, '0') + 
         now.getDate().toString().padStart(2, '0')
}

/**
 * Splits email into local part and domain
 */
export const parseEmail = (email: string): { localPart: string; domain: string } => {
  const [localPart, domain] = email.split('@')
  return { localPart, domain }
}

/**
 * Checks if the generated alias would exceed email limits
 */
export const wouldExceedLimit = (baseEmail: string, aliasLength: number): boolean => {
  const { localPart } = parseEmail(baseEmail)
  return (localPart.length + aliasLength + 1) > LOCAL_PART_MAX_LENGTH // +1 for the + sign
}

/**
 * Calculates remaining characters for alias generation
 */
export const getRemainingChars = (baseEmail: string): number => {
  const { localPart } = parseEmail(baseEmail)
  return LOCAL_PART_MAX_LENGTH - localPart.length - 1 // -1 for the + sign
} 