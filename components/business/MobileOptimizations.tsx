'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Maximize2, Minimize2 } from 'lucide-react'

/**
 * Business-specific mobile optimizations for alias generator
 */
const MobileOptimizations: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="relative">
      {/* Mobile Fullscreen Toggle */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            size="sm"
            variant="outline"
            onClick={toggleFullscreen}
            className="bg-white/90 backdrop-blur-sm shadow-md"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      
      {/* Enhanced mobile layout */}
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  )
}

export default MobileOptimizations 