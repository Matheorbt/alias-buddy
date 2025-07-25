'use client'

import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useClipboard } from '@/hooks/useClipboard'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  onCopy?: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showText?: boolean
}

/**
 * Core reusable copy button component
 */
const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  onCopy,
  variant = 'outline',
  size = 'sm',
  className,
  showText = false,
}) => {
  const { isCopied, copyToClipboard } = useClipboard()

  const handleCopy = async () => {
    const success = await copyToClipboard(text)
    if (success && onCopy) {
      onCopy()
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn(
        'transition-all duration-200',
        isCopied && 'bg-green-50 border-green-200 text-green-700 hover:bg-green-50',
        className
      )}
      aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
    >
      {isCopied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {showText && (
        <span className="ml-2">
          {isCopied ? 'Copied!' : 'Copy'}
        </span>
      )}
    </Button>
  )
}

export default CopyButton 