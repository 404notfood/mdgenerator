"use client"

import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Edit, Save, X, FileText, Crown, Sparkles, ArrowLeft, Loader2, Package, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Template {
  id: string
  name: string
  description: string
  category: string
  price: number
  isPremium: boolean
  isActive: boolean
}

const categoryColors: Record<string, string> = {
  STARTUP: "from-purple-500 to-pink-500",
  OPEN_SOURCE: "from-green-500 to-emerald-500",
  API: "from-blue-500 to-cyan-500",
  MOBILE: "from-orange-500 to-red-500",
  WEB: "from-indigo-500 to-violet-500",
  DATA_SCIENCE: "from-yellow-500 to-orange-500",
  GENERAL: "from-gray-500 to-slate-500"
}

const categoryLabels: Record<string, string> = {
  STARTUP: "Startup",
  OPEN_SOURCE: "Open Source",
  API: "API",
  MOBILE: "Mobile",
  WEB: "Web",
  DATA_SCIENCE: "Data Science",
  GENERAL: "Général"
}

export default function AdminTemplatesPage() {
  const { data: session, isPending } = useSession()
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPrice, setEditPrice] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const isAdmin = session && (session.user as any).role === 'ADMIN'

  useEffect(() => {
    if (!isAdmin) return
    fetchTemplates()
  }, [isAdmin])

  useEffect(() => {
    let filtered = templates

    if (searchQuery.trim()) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }

    setFilteredTemplates(filtered)
  }, [searchQuery, selectedCategory, templates])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const data = await response.json()
        const templateList = Array.isArray(data) ? data : data.templates || []
        setTemplates(templateList)
        setFilteredTemplates(templateList)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePrice = async (templateId: string, newPrice: number) => {
    try {
      const response = await fetch(`/api/admin/templates/${templateId}/price`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice })
      })

      if (response.ok) {
        setTemplates(prev =>
          prev.map(template =>
            template.id === templateId ? { ...template, price: newPrice } : template
          )
        )
        setEditingId(null)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prix:', error)
    }
  }

  const categories = ["all", ...Object.keys(categoryLabels)]

  if (isPending) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Accès refusé</h1>
          <p className="text-[var(--color-text-muted)] mb-6">Vous devez être administrateur pour accéder à cette page.</p>
          <Button asChild className="btn-primary">
            <Link href="/dashboard">Retour au dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border-dark)] bg-[var(--color-surface-dark)]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)]/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
                      Gestion des Templates
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {templates.length} templates disponibles
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/30">
              ADMIN
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <Input
              placeholder="Rechercher un template..."
              className="pl-10 bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-bg-darker)] text-[var(--color-text-muted)] border border-[var(--color-border-dark)] hover:border-[var(--color-primary)]/50"
                }`}
              >
                {cat === "all" ? "Tous" : categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 mx-auto text-[var(--color-primary)] animate-spin mb-4" />
            <p className="text-[var(--color-text-muted)]">Chargement des templates...</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--color-bg-darker)] flex items-center justify-center">
              <FileText className="w-8 h-8 text-[var(--color-text-muted)]" />
            </div>
            <p className="text-[var(--color-text-secondary)]">Aucun template trouvé</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] hover:border-[var(--color-primary)]/30 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[template.category] || categoryColors.GENERAL} flex items-center justify-center flex-shrink-0`}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[var(--color-text-primary)] truncate">
                          {template.name}
                        </h3>
                        {template.isPremium && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium">
                            <Crown className="w-3 h-3" />
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)] line-clamp-1 mb-2">
                        {template.description}
                      </p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gradient-to-r ${categoryColors[template.category] || categoryColors.GENERAL} text-white`}>
                        {categoryLabels[template.category] || template.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-shrink-0">
                    {editingId === template.id ? (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            className="w-24 pr-8 bg-[var(--color-bg-darker)] border-[var(--color-border-dark)] text-[var(--color-text-primary)]"
                            min="0"
                            step="10"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)]">ct</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleUpdatePrice(template.id, editPrice)}
                          className="btn-primary h-9 w-9 p-0"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                          className="h-9 w-9 p-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`text-xl font-bold ${template.price === 0 ? 'text-green-400' : 'text-[var(--color-primary)]'}`}>
                          {template.price === 0 ? 'Gratuit' : `${(template.price / 100).toFixed(2)}€`}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(template.id)
                            setEditPrice(template.price)
                          }}
                          className="h-9 w-9 p-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-darker)]"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
