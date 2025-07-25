'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Share2, Twitter, MessageCircle, Copy, Check } from 'lucide-react'
import { usePosthog } from '@/hooks/usePosthog'
import { useClipboard } from '@/hooks/useClipboard'

/**
 * Business-specific social sharing component
 */
const SocialShareButtons: React.FC = () => {
  const { capture } = usePosthog()
  const { copyToClipboard, isCopied } = useClipboard()
  const [showShareMenu, setShowShareMenu] = useState(false)

  const shareData = {
    title: "Alias Buddy - Email Alias Generator for Developers",
    text: "🚀 Found this awesome dev tool! Generate unique email aliases for testing instantly. Clean UI, works offline, privacy-first. Perfect for developers! 🔥",
    url: typeof window !== 'undefined' ? window.location.href : 'https://alias-buddy.vercel.app',
    hashtags: ['DevTools', 'EmailTesting', 'Privacy', 'Developer', 'OpenSource']
  }

  const handleShare = async (platform: string) => {
    capture('share_clicked', { platform })
    
    switch (platform) {
      case 'twitter':
        const twitterText = encodeURIComponent(shareData.text)
        const twitterUrl = encodeURIComponent(shareData.url)
        const hashtags = shareData.hashtags.join(',')
        window.open(
          `https://twitter.com/intent/tweet?text=${twitterText}&url=${twitterUrl}&hashtags=${hashtags}&via=matheorbt_`,
          '_blank',
          'width=550,height=420'
        )
        break
        
      case 'reddit':
        const redditTitle = encodeURIComponent(shareData.title)
        const redditUrl = encodeURIComponent(shareData.url)
        window.open(
          `https://reddit.com/submit?title=${redditTitle}&url=${redditUrl}`,
          '_blank',
          'width=600,height=500'
        )
        break
        
      case 'copy':
        const shareText = `${shareData.text}\n\n${shareData.url}`
        await copyToClipboard(shareText)
        break
        
             case 'native':
         if ('share' in navigator) {
           try {
             await navigator.share({
               title: shareData.title,
               text: shareData.text,
               url: shareData.url,
             })
           } catch (err) {
             console.log('Share canceled')
           }
         }
         break
    }
    
    setShowShareMenu(false)
  }

  const handleShareToggle = () => {
    setShowShareMenu(!showShareMenu)
    if (!showShareMenu) {
      capture('share_menu_opened')
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShareToggle}
        className="bg-white/90 backdrop-blur-sm border-blue-200 text-blue-700 hover:bg-blue-50"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      {showShareMenu && (
        <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 min-w-48">
          <div className="space-y-1">
            <button
              onClick={() => handleShare('twitter')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Twitter className="h-4 w-4 text-blue-500" />
              Share on X (Twitter)
            </button>
            
            <button
              onClick={() => handleShare('reddit')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-orange-500" />
              Share on Reddit
            </button>
            
            <button
              onClick={() => handleShare('copy')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
              {isCopied ? 'Copied!' : 'Copy Link'}
            </button>
            
                         {'share' in navigator && (
              <button
                onClick={() => handleShare('native')}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <Share2 className="h-4 w-4 text-gray-500" />
                Share...
              </button>
            )}
          </div>
        </div>
      )}
      
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  )
}

export default SocialShareButtons 