"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sparkles,
  Loader2,
  AlertCircle,
  Settings,
  Wand2,
  Code2,
  Megaphone,
  Minus
} from "lucide-react"
import Link from "next/link"

interface AIGeneratorProps {
  onGenerate: (content: string) => void
}

const STYLES = [
  { id: "technical", label: "Technique", icon: Code2, description: "Documentation détaillée" },
  { id: "marketing", label: "Marketing", icon: Megaphone, description: "Mise en avant des fonctionnalités" },
  { id: "minimal", label: "Minimal", icon: Minus, description: "Court et concis" }
]

export function AIGenerator({ onGenerate }: AIGeneratorProps) {
  const [open, setOpen] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [technologies, setTechnologies] = useState("")
  const [style, setStyle] = useState<"technical" | "marketing" | "minimal">("technical")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null)

  const checkApiKey = async () => {
    try {
      const response = await fetch("/api/user/ai-key")
      if (response.ok) {
        const data = await response.json()
        setHasApiKey(data.hasKey)
      }
    } catch (error) {
      setHasApiKey(false)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) {
      checkApiKey()
      setError(null)
    }
  }

  const handleGenerate = async () => {
    if (!projectName.trim()) {
      setError("Le nom du projet est requis")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: projectName.trim(),
          description: description.trim() || undefined,
          technologies: technologies.trim() ? technologies.split(",").map(t => t.trim()) : undefined,
          style
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la génération")
      }

      // Convert markdown to HTML for TipTap
      const htmlContent = convertMarkdownToHtml(data.content)
      onGenerate(htmlContent)
      setOpen(false)

      // Reset form
      setProjectName("")
      setDescription("")
      setTechnologies("")

    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Simple markdown to HTML converter
  const convertMarkdownToHtml = (markdown: string): string => {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Unordered lists
      .replace(/^\s*[-*] (.*)$/gim, '<li>$1</li>')
      // Ordered lists
      .replace(/^\s*\d+\. (.*)$/gim, '<li>$1</li>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      // Horizontal rule
      .replace(/^---$/gim, '<hr />')
      // Paragraphs (lines that aren't already wrapped)
      .replace(/^(?!<[huplo]|<li|<hr|<pre|<code)(.+)$/gim, '<p>$1</p>')

    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>')

    return html
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="btn-secondary bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-500/50">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Générer avec l'IA
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-[var(--color-surface-dark)] border-[var(--color-border-dark)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Générer un README avec l'IA
          </DialogTitle>
          <DialogDescription className="text-[var(--color-text-secondary)]">
            Décrivez votre projet et l'IA générera un README professionnel.
          </DialogDescription>
        </DialogHeader>

        {hasApiKey === false && (
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-300 font-medium mb-1">Clé API requise</p>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  Configurez votre clé API IA dans les paramètres pour utiliser cette fonctionnalité.
                </p>
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
                >
                  <Settings className="w-4 h-4" />
                  Configurer ma clé API
                </Link>
              </div>
            </div>
          </div>
        )}

        {hasApiKey !== false && (
          <div className="space-y-4 py-4">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Nom du projet *
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Mon Super Projet"
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Description (optionnel)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Une brève description de ce que fait votre projet..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none resize-none"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Technologies (séparées par des virgules)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="React, TypeScript, Node.js, PostgreSQL"
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
              />
            </div>

            {/* Style */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      style === s.id
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-[var(--color-border-dark)] hover:border-[var(--color-border-light)]"
                    }`}
                  >
                    <s.icon className={`w-5 h-5 mx-auto mb-1 ${style === s.id ? "text-purple-400" : "text-[var(--color-text-muted)]"}`} />
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{s.label}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{s.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !projectName.trim()}
              className="btn-primary w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Générer le README
                </>
              )}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
