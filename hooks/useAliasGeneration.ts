import { useState } from 'react'
import { usePosthog } from './usePosthog'
import { useLocalStorage } from './useLocalStorage'
import { 
  isValidEmail, 
  sanitizeForEmail, 
  generateShortHash, 
  formatDate, 
  parseEmail,
  wouldExceedLimit 
} from '@/lib/emailUtils'
import { BUSINESS_STORAGE_KEYS } from '@/constants/emailPatterns'

export interface AliasFormData {
  baseEmail: string
  feature: string
  includeDate: boolean
  project: string
  environment: string
  quantity: number
}

export interface GeneratedAlias {
  id: string
  email: string
  feature: string
  project: string
  environment: string
  createdAt: Date
}

/**
 * Business-specific hook for alias generation
 */
export const useAliasGeneration = () => {
  const { capture } = usePosthog()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Persist generated aliases and form settings
  const [generatedAliases, setGeneratedAliases] = useLocalStorage<GeneratedAlias[]>(
    BUSINESS_STORAGE_KEYS.GENERATED_ALIASES, 
    []
  )
  const [formSettings, setFormSettings] = useLocalStorage<Partial<AliasFormData>>(
    BUSINESS_STORAGE_KEYS.FORM_SETTINGS,
    { environment: 'dev', quantity: 1, includeDate: true }
  )
  const [recentProjects, setRecentProjects] = useLocalStorage<string[]>(
    BUSINESS_STORAGE_KEYS.RECENT_PROJECTS,
    []
  )

  const validateForm = (data: AliasFormData): boolean => {
    const newErrors: Record<string, string> = {}

    if (!data.baseEmail) {
      newErrors.baseEmail = 'Base email is required'
    } else if (!isValidEmail(data.baseEmail)) {
      newErrors.baseEmail = 'Please enter a valid email address'
    }

    if (!data.feature.trim()) {
      newErrors.feature = 'Feature name is required'
    }

    if (!data.project.trim()) {
      newErrors.project = 'Project name is required'
    }

    // Check if alias would exceed email length limits
    if (data.baseEmail && isValidEmail(data.baseEmail)) {
      const sanitizedFeature = sanitizeForEmail(data.feature)
      const date = data.includeDate ? formatDate() : ''
      const hash = generateShortHash()
      const aliasLength = sanitizedFeature.length + date.length + hash.length + 2 // +2 for dashes
      
      if (wouldExceedLimit(data.baseEmail, aliasLength)) {
        newErrors.feature = 'Feature name too long for this email address'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateAliases = async (data: AliasFormData): Promise<GeneratedAlias[]> => {
    setIsGenerating(true)

    try {
      if (!validateForm(data)) {
        capture('alias_generation_failed', { reason: 'validation_error' })
        return []
      }

      const { localPart, domain } = parseEmail(data.baseEmail)
      const sanitizedFeature = sanitizeForEmail(data.feature)
      const date = data.includeDate ? formatDate() : ''

      const aliases: GeneratedAlias[] = []

      for (let i = 0; i < data.quantity; i++) {
        const hash = generateShortHash()
        const aliasParts = [sanitizedFeature, date, hash].filter(Boolean)
        const aliasString = aliasParts.join('-')
        const email = `${localPart}+${aliasString}@${domain}`

        aliases.push({
          id: generateShortHash(),
          email,
          feature: data.feature,
          project: data.project,
          environment: data.environment,
          createdAt: new Date(),
        })
      }

      // Save to localStorage
      const updatedAliases = [...aliases, ...generatedAliases].slice(0, 1000) // Limit to 1000 entries
      setGeneratedAliases(updatedAliases)

      // Update recent projects
      const updatedProjects = [data.project, ...recentProjects.filter(p => p !== data.project)].slice(0, 10)
      setRecentProjects(updatedProjects)

      // Save form settings
      setFormSettings({
        environment: data.environment,
        quantity: data.quantity,
        includeDate: data.includeDate,
      })

      // Track generation event
      capture('alias_generated', {
        quantity: data.quantity,
        environment: data.environment,
        includes_date: data.includeDate,
        feature_length: data.feature.length,
        project: data.project,
      })

      return aliases

    } catch (error) {
      console.error('Error generating aliases:', error)
      capture('alias_generation_failed', { reason: 'generation_error', error: error instanceof Error ? error.message : 'unknown' })
      return []
    } finally {
      setIsGenerating(false)
    }
  }

  const clearGeneratedAliases = () => {
    setGeneratedAliases([])
    capture('aliases_cleared')
  }

  const clearFormData = () => {
    setErrors({})
    capture('form_cleared')
  }

  return {
    errors,
    isGenerating,
    generatedAliases,
    formSettings,
    recentProjects,
    validateForm,
    generateAliases,
    clearGeneratedAliases,
    clearFormData,
  }
} 