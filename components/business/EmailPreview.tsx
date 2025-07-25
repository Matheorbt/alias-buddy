'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Mail, Copy, CopyCheck, Download, Trash2, Calendar, Building, Globe } from 'lucide-react'
import CopyButton from '@/components/core/CopyButton'
import { usePosthog } from '@/hooks/usePosthog'
import { useClipboard } from '@/hooks/useClipboard'
import { type GeneratedAlias } from '@/hooks/useAliasGeneration'

interface EmailPreviewProps {
  aliases: GeneratedAlias[]
  onClear?: () => void
}

/**
 * Business-specific component to preview and manage generated email aliases
 */
const EmailPreview: React.FC<EmailPreviewProps> = ({ aliases, onClear }) => {
  const { capture } = usePosthog()
  const { copyToClipboard, isCopied } = useClipboard()

  const handleCopyAll = async () => {
    const allEmails = aliases.map(alias => alias.email).join('\n')
    const success = await copyToClipboard(allEmails)
    if (success) {
      capture('alias_copied', { type: 'all', count: aliases.length })
    }
  }

  const handleCopyIndividual = (email: string) => {
    capture('alias_copied', { type: 'individual' })
  }

  const handleExportCSV = () => {
    const csvContent = [
      'Email,Feature,Project,Environment,Created At',
      ...aliases.map(alias => 
        `"${alias.email}","${alias.feature}","${alias.project}","${alias.environment}","${alias.createdAt.toISOString()}"`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-aliases-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    capture('aliases_exported', { format: 'csv', count: aliases.length })
  }

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(aliases, null, 2)
    
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-aliases-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    capture('aliases_exported', { format: 'json', count: aliases.length })
  }

  if (aliases.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
        <CardContent className="py-16">
          <div className="text-center space-y-4">
            <div className="p-4 rounded-full bg-gray-100 w-16 h-16 mx-auto flex items-center justify-center">
              <Mail className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">No aliases generated yet</h3>
              <p className="text-gray-600 mt-1">Fill out the form above to generate your email aliases</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-green-50/30">
      <CardHeader className="space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-600">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Generated Aliases
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                {aliases.length} email {aliases.length === 1 ? 'alias' : 'aliases'} ready to use
              </CardDescription>
            </div>
          </div>

          <Badge className="bg-green-100 text-green-800 border-green-200">
            {aliases.length} {aliases.length === 1 ? 'alias' : 'aliases'}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleCopyAll}
            variant="outline"
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            {isCopied ? (
              <>
                <CopyCheck className="h-4 w-4 mr-2" />
                Copied All!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </>
            )}
          </Button>

          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>

          <Button
            onClick={handleExportJSON}
            variant="outline"
            size="sm"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>

          {onClear && (
            <Button
              onClick={onClear}
              variant="outline"
              size="sm"
              className="border-red-200 text-red-700 hover:bg-red-50 ml-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {aliases.map((alias, index) => (
          <div key={alias.id}>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-gray-300 transition-all duration-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-mono bg-white px-2 py-1 rounded border text-gray-800 break-all">
                    {alias.email}
                  </code>
                  <CopyButton
                    text={alias.email}
                    onCopy={() => handleCopyIndividual(alias.email)}
                    size="sm"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1 text-purple-600">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    {alias.feature}
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <Building className="h-3 w-3" />
                    {alias.project}
                  </span>
                  <span className="flex items-center gap-1 text-blue-600">
                    <Globe className="h-3 w-3" />
                    {alias.environment}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {alias.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            {index < aliases.length - 1 && <Separator className="opacity-30" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default EmailPreview 