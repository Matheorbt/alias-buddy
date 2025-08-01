'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Mail, Sparkles, Hash, Calendar, Building, ChevronDown } from 'lucide-react'
import { useAliasGeneration, type AliasFormData, type GeneratedAlias } from '@/hooks/useAliasGeneration'
import { usePosthog } from '@/hooks/usePosthog'
import { BUSINESS_ENVIRONMENTS, BUSINESS_QUANTITY_OPTIONS } from '@/constants/emailPatterns'
import { getRemainingChars, isValidEmail } from '@/lib/emailUtils'

/**
 * Business-specific alias generator form component
 */
interface AliasGeneratorProps {
  onAliasesGenerated?: (aliases: GeneratedAlias[]) => void
}

const AliasGenerator: React.FC<AliasGeneratorProps> = ({ onAliasesGenerated }) => {
  const { capture } = usePosthog()
  const { 
    errors, 
    isGenerating, 
    formSettings, 
    recentProjects, 
    generateAliases,
    clearFormData 
  } = useAliasGeneration()

  const [isClient, setIsClient] = useState(false)
  const [showProjectDropdown, setShowProjectDropdown] = useState(false)
  const [formData, setFormData] = useState<AliasFormData>({
    baseEmail: '',
    feature: '',
    includeDate: true, // Always start with default to avoid hydration mismatch
    project: '',
    environment: 'dev', // Always start with default to avoid hydration mismatch
    quantity: 1, // Always start with default to avoid hydration mismatch
  })

  // Ensure we only show client-side data after hydration
  useEffect(() => {
    setIsClient(true)
    
    // Update form data with saved settings after client hydration
    setFormData(prev => ({
      ...prev,
      includeDate: formSettings.includeDate ?? true,
      environment: formSettings.environment ?? 'dev',
      quantity: formSettings.quantity ?? 1,
    }))
  }, [formSettings])

  const handleInputChange = (field: keyof AliasFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerate = async () => {
    // Track button click event
    capture('generate_button_clicked', {
      has_base_email: Boolean(formData.baseEmail),
      has_feature: Boolean(formData.feature),
      has_project: Boolean(formData.project),
      quantity: formData.quantity,
      environment: formData.environment,
    })

    const aliases = await generateAliases(formData)
    if (onAliasesGenerated) {
      onAliasesGenerated(aliases)
    }
  }

  const handleClear = () => {
    setFormData({
      baseEmail: '',
      feature: '',
      includeDate: true,
      project: '',
      environment: 'dev',
      quantity: 1,
    })
    clearFormData()
    if (onAliasesGenerated) {
      onAliasesGenerated([])
    }
  }

  const remainingChars = formData.baseEmail && isValidEmail(formData.baseEmail) 
    ? getRemainingChars(formData.baseEmail) 
    : null

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="space-y-4 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Email Alias Generator
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Generate unique email aliases for your development testing
            </CardDescription>
          </div>
        </div>
        
        {remainingChars !== null && (
          <div className="flex items-center gap-2 text-sm">
            <Hash className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              {remainingChars} characters remaining for alias
            </span>
            {remainingChars < 20 && (
              <Badge variant="outline" className="text-amber-600 border-amber-200">
                Low space
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Base Email */}
        <div className="space-y-2">
          <Label htmlFor="baseEmail" className="text-sm font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-500" />
            Base Email Address
          </Label>
          <Input
            id="baseEmail"
            type="email"
            placeholder="john.doe@gmail.com"
            value={formData.baseEmail}
            onChange={(e) => handleInputChange('baseEmail', e.target.value)}
            className={`transition-all duration-200 ${errors.baseEmail ? 'border-red-300 focus:border-red-500' : 'focus:border-blue-500'}`}
          />
          {errors.baseEmail && (
            <p className="text-sm text-red-600 font-medium">{errors.baseEmail}</p>
          )}
        </div>

        <Separator className="opacity-30" />

        {/* Feature and Project Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="feature" className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              Feature Name
            </Label>
            <Input
              id="feature"
              placeholder="subscription flow"
              value={formData.feature}
              onChange={(e) => handleInputChange('feature', e.target.value)}
              className={`transition-all duration-200 ${errors.feature ? 'border-red-300 focus:border-red-500' : 'focus:border-purple-500'}`}
            />
            {errors.feature && (
              <p className="text-sm text-red-600 font-medium">{errors.feature}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="project" className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4 text-green-500" />
              Project Name
              {isClient && recentProjects.length > 0 && (
                <span className="text-xs text-gray-500 font-normal">
                  ({recentProjects.length} recent)
                </span>
              )}
            </Label>
            <div className="relative">
              <Input
                id="project"
                placeholder="my-awesome-app"
                value={formData.project}
                onChange={(e) => handleInputChange('project', e.target.value)}
                onFocus={() => setShowProjectDropdown(true)}
                className={`transition-all duration-200 ${errors.project ? 'border-red-300 focus:border-red-500' : 'focus:border-green-500'} ${isClient && recentProjects.length > 0 ? 'pr-10' : ''}`}
                autoComplete="off"
              />
              {isClient && recentProjects.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Show recent projects"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${showProjectDropdown ? 'rotate-180' : ''}`} />
                </button>
              )}
              
              {/* Dropdown for recent projects */}
              {isClient && recentProjects.length > 0 && showProjectDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Recent Projects:</p>
                                         {recentProjects.map((project) => (
                      <button
                        key={project}
                        type="button"
                        onClick={() => {
                          handleInputChange('project', project)
                          setShowProjectDropdown(false)
                        }}
                        className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
                      >
                        <Building className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="truncate">{project}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Click outside to close dropdown */}
            {showProjectDropdown && (
              <div 
                className="fixed inset-0 z-5" 
                onClick={() => setShowProjectDropdown(false)}
                onKeyDown={(e) => e.key === 'Escape' && setShowProjectDropdown(false)}
                tabIndex={-1}
              />
            )}
            
            {errors.project && (
              <p className="text-sm text-red-600 font-medium">{errors.project}</p>
            )}
          </div>
        </div>

        {/* Environment and Quantity Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Environment</Label>
            <Select 
              value={formData.environment} 
              onValueChange={(value) => handleInputChange('environment', value)}
            >
              <SelectTrigger className="focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_ENVIRONMENTS.map(env => (
                  <SelectItem key={env.value} value={env.value}>
                    {env.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Quantity</Label>
            <Select 
              value={formData.quantity.toString()} 
              onValueChange={(value) => handleInputChange('quantity', parseInt(value))}
            >
              <SelectTrigger className="focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_QUANTITY_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="opacity-30" />

        {/* Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="includeDate"
              checked={formData.includeDate}
              onCheckedChange={(checked) => handleInputChange('includeDate', checked)}
            />
            <Label htmlFor="includeDate" className="text-sm font-medium flex items-center gap-2 cursor-pointer">
              <Calendar className="h-4 w-4 text-blue-500" />
              Include date in alias
            </Label>
          </div>


        </div>

        <Separator className="opacity-30" />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.baseEmail || !formData.feature || !formData.project}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-6 text-base shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate {formData.quantity} {formData.quantity === 1 ? 'Alias' : 'Aliases'}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleClear}
            className="px-8 py-6 border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AliasGenerator 