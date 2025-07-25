'use client'

import { useState } from 'react'
import AliasGenerator from './AliasGenerator'
import EmailPreview from './EmailPreview'
import { useAliasGeneration, type GeneratedAlias } from '@/hooks/useAliasGeneration'

/**
 * Business-specific layout component that manages the alias generation flow
 */
const AliasGeneratorLayout: React.FC = () => {
  const [generatedAliases, setGeneratedAliases] = useState<GeneratedAlias[]>([])
  const { clearGeneratedAliases } = useAliasGeneration()

  const handleAliasesGenerated = (aliases: GeneratedAlias[]) => {
    setGeneratedAliases(aliases)
  }

  const handleClearAll = () => {
    setGeneratedAliases([])
    clearGeneratedAliases()
  }

  return (
    <div className="space-y-8">
      <AliasGenerator onAliasesGenerated={handleAliasesGenerated} />
      <EmailPreview aliases={generatedAliases} onClear={handleClearAll} />
    </div>
  )
}

export default AliasGeneratorLayout 