"use client"

import { useState } from "react"
import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import { useTemplates, TemplateCategory } from "@/hooks/use-templates"
import { PurchaseButton } from "@/components/templates/purchase-button"
import { TemplatePreviewDialog } from "@/components/templates/template-preview-dialog"
import {
  Eye,
  Sparkles,
  LayoutTemplate,
  Check,
  Search,
  Filter,
  Star,
  Rocket,
  Code2,
  Smartphone,
  Globe,
  Database,
  Layers,
  ArrowRight,
  Crown,
  Zap
} from "lucide-react"

const categoryConfig: Record<TemplateCategory, { label: string; icon: React.ReactNode; color: string }> = {
  STARTUP: { label: "Startup", icon: <Rocket className="w-4 h-4" />, color: "from-purple-500 to-pink-500" },
  OPEN_SOURCE: { label: "Open Source", icon: <Code2 className="w-4 h-4" />, color: "from-green-500 to-emerald-500" },
  API: { label: "API", icon: <Zap className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" },
  MOBILE: { label: "Mobile", icon: <Smartphone className="w-4 h-4" />, color: "from-pink-500 to-rose-500" },
  WEB: { label: "Web", icon: <Globe className="w-4 h-4" />, color: "from-indigo-500 to-violet-500" },
  DATA_SCIENCE: { label: "Data Science", icon: <Database className="w-4 h-4" />, color: "from-orange-500 to-amber-500" },
  GENERAL: { label: "Général", icon: <Layers className="w-4 h-4" />, color: "from-gray-500 to-slate-500" }
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | undefined>()
  const [searchQuery, setSearchQuery] = useState("")

  const { templates, loading, error } = useTemplates({
    category: selectedCategory
  })

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectTemplate = (content: string) => {
    localStorage.setItem('selectedTemplate', content)
    window.location.href = '/editor'
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb orb-teal w-[500px] h-[500px] -top-40 -right-40 opacity-30" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-0 -left-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <LayoutTemplate className="w-4 h-4" />
              <span>Templates README</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Templates README{" "}
              <span className="text-gradient">professionnels</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              Des templates soigneusement conçus pour tous types de projets.
              Achat unique de 5 a 15 euros, utilisation illimitée.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Achat unique</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Utilisation illimitée</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Mises à jour gratuites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-y border-[var(--color-border-dark)] bg-[var(--color-surface-dark)]/50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Rechercher un template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory(undefined)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === undefined
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-[var(--color-bg-dark)]'
                    : 'bg-[var(--color-surface-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border-dark)]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Tous
                </span>
              </button>
              {Object.entries(categoryConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as TemplateCategory)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === key
                      ? `bg-gradient-to-r ${config.color} text-white`
                      : 'bg-[var(--color-surface-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border-dark)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {config.icon}
                    {config.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center animate-pulse mb-6">
                <LayoutTemplate className="w-8 h-8 text-[var(--color-bg-dark)]" />
              </div>
              <p className="text-[var(--color-text-secondary)]">Chargement des templates...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="card-bento max-w-md mx-auto border-red-500/30">
                <p className="text-red-400 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-[var(--color-text-muted)]">
                  {filteredTemplates.length} template{filteredTemplates.length > 1 ? 's' : ''} trouvé{filteredTemplates.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const categoryConf = categoryConfig[template.category]
                  return (
                    <div
                      key={template.id}
                      className="card-bento group hover:border-[var(--color-primary-dark)] transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${categoryConf.color} text-white`}>
                          {categoryConf.icon}
                          {categoryConf.label}
                        </span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gradient">
                            {(template.price / 100).toFixed(0)}euros
                          </div>
                          <div className="text-xs text-[var(--color-text-muted)]">Achat unique</div>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
                        {template.description}
                      </p>

                      {/* Preview */}
                      <TemplatePreviewDialog
                        templateName={template.name}
                        content={template.content}
                      >
                        <div className="relative rounded-xl overflow-hidden bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] h-36 mb-4 group-hover:border-[var(--color-primary-dark)] transition-colors cursor-pointer">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <LayoutTemplate className="w-10 h-10 text-[var(--color-text-muted)] mx-auto mb-2 group-hover:text-[var(--color-primary)] transition-colors" />
                              <span className="text-xs text-[var(--color-text-muted)]">
                                Cliquez pour voir l'aperçu
                              </span>
                            </div>
                          </div>
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                            <span className="btn-secondary text-sm py-2 px-4">
                              <Eye className="w-4 h-4" />
                              Prévisualiser
                            </span>
                          </div>
                        </div>
                      </TemplatePreviewDialog>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <TemplatePreviewDialog
                          templateName={template.name}
                          content={template.content}
                        >
                          <button className="btn-secondary flex-1 text-sm py-2">
                            <Eye className="w-4 h-4" />
                            Aperçu
                          </button>
                        </TemplatePreviewDialog>
                        <PurchaseButton
                          templateId={template.id}
                          templateName={template.name}
                          templateContent={template.content}
                          price={template.price}
                          isPremium={template.isPremium}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Empty State */}
              {filteredTemplates.length === 0 && (
                <div className="text-center py-20">
                  <div className="card-bento max-w-md mx-auto">
                    <LayoutTemplate className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                      Aucun template trouvé
                    </h3>
                    <p className="text-[var(--color-text-muted)] mb-6">
                      Essayez une autre catégorie ou modifiez votre recherche
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory(undefined)
                        setSearchQuery("")
                      }}
                      className="btn-primary"
                    >
                      <Sparkles className="w-4 h-4" />
                      Voir tous les templates
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {!loading && filteredTemplates.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10" />
          <div className="orb orb-teal w-[400px] h-[400px] top-0 left-1/4 opacity-20" />

          <div className="container-custom relative z-10">
            <div className="card-bento max-w-3xl mx-auto text-center border-[var(--color-primary-dark)]">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <Star className="w-8 h-8 text-[var(--color-bg-dark)]" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                Besoin d'un template personnalisé ?
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
                Contactez-nous pour créer un template sur mesure parfaitement adapté à votre projet
              </p>
              <Link href="/contact" className="btn-primary inline-flex">
                Demander un template personnalisé
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
