"use client"

import { useState } from "react"

export function useExport() {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportMarkdown = async (content: string, filename?: string) => {
    try {
      setIsExporting(true)
      setError(null)

      const response = await fetch('/api/export/markdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          filename
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'export')
      }

      // Créer un lien de téléchargement
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = filename || `readme-${Date.now()}.md`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      return false
    } finally {
      setIsExporting(false)
    }
  }

  const exportHtml = async (content: string, filename?: string, includeStyles: boolean = true) => {
    try {
      setIsExporting(true)
      setError(null)

      const response = await fetch('/api/export/html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          filename,
          includeStyles
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'export')
      }

      // Créer un lien de téléchargement
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = filename || `readme-${Date.now()}.html`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      return false
    } finally {
      setIsExporting(false)
    }
  }

  return {
    exportMarkdown,
    exportHtml,
    isExporting,
    error,
    clearError: () => setError(null)
  }
}