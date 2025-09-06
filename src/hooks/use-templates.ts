"use client"

import { useEffect, useState } from "react"

export type TemplateCategory = "STARTUP" | "OPEN_SOURCE" | "API" | "MOBILE" | "WEB" | "DATA_SCIENCE" | "GENERAL"

export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  price: number
  thumbnail?: string
  isPremium: boolean
  createdAt: string
}

interface UseTemplatesOptions {
  category?: TemplateCategory
  premium?: boolean
}

export function useTemplates(options: UseTemplatesOptions = {}) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true)
        setError(null)

        const searchParams = new URLSearchParams()
        if (options.category) searchParams.set("category", options.category)
        if (options.premium !== undefined) searchParams.set("premium", options.premium.toString())

        const response = await fetch(`/api/templates?${searchParams.toString()}`)
        
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des templates")
        }

        const data = await response.json()
        setTemplates(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [options.category, options.premium])

  return { templates, loading, error, refetch: () => fetchTemplates() }
}

export function useTemplate(id: string) {
  const [template, setTemplate] = useState<Template & { content?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTemplate() {
      if (!id) return

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/templates/${id}`)
        
        if (!response.ok) {
          throw new Error("Template non trouvé")
        }

        const data = await response.json()
        setTemplate(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }

    fetchTemplate()
  }, [id])

  return { template, loading, error }
}

export function useTemplateAccess(templateId: string) {
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [reason, setReason] = useState<string>("")
  const [price, setPrice] = useState<number>(0)

  useEffect(() => {
    async function checkAccess() {
      if (!templateId) return

      try {
        setLoading(true)

        const response = await fetch(`/api/templates/${templateId}/access`)
        
        if (response.ok) {
          const data = await response.json()
          setHasAccess(data.hasAccess)
          setReason(data.reason || "")
          setPrice(data.price || 0)
        } else {
          setHasAccess(false)
          setReason("unauthenticated")
        }
      } catch (err) {
        setHasAccess(false)
        setReason("error")
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [templateId])

  return { hasAccess, loading, reason, price }
}