"use client"

import { useState } from "react"

interface UploadResult {
  url: string
  filename: string
  size: number
  type: string
}

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (file: File): Promise<UploadResult | null> => {
    try {
      setIsUploading(true)
      setError(null)
      setUploadProgress(0)

      // Vérifications côté client
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Type de fichier non supporté. Utilisez JPG, PNG, GIF ou WebP.")
      }

      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        throw new Error("Le fichier est trop volumineux. Taille maximum: 5MB.")
      }

      const formData = new FormData()
      formData.append('file', file)

      // Simuler le progrès (en l'absence d'API de progrès native)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de l\'upload')
      }

      const result = await response.json()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      return null
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const uploadMultipleFiles = async (files: File[]): Promise<UploadResult[]> => {
    const results: UploadResult[] = []
    
    for (const file of files) {
      const result = await uploadFile(file)
      if (result) {
        results.push(result)
      } else {
        // Si un upload échoue, arrêter le processus
        break
      }
    }

    return results
  }

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    uploadProgress,
    error,
    clearError: () => setError(null)
  }
}