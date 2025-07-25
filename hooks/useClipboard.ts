import { useState } from 'react'

interface UseClipboardReturn {
  isCopied: boolean
  copyToClipboard: (text: string) => Promise<boolean>
  resetCopied: () => void
}

/**
 * Core hook for clipboard functionality - reusable across SaaS projects
 */
export const useClipboard = (resetDelay: number = 2000): UseClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      
      setTimeout(() => {
        setIsCopied(false)
      }, resetDelay)
      
      return true
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      setIsCopied(false)
      return false
    }
  }

  const resetCopied = () => {
    setIsCopied(false)
  }

  return {
    isCopied,
    copyToClipboard,
    resetCopied,
  }
} 