'use client'

import { usePosthogInit } from '@/hooks/usePosthog'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  usePosthogInit()
  
  return <>{children}</>
}

export default AnalyticsProvider 