"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  BookOpen,
  Code2,
  Sparkles,
  FileText,
  Download,
  GitBranch,
  Palette,
  BarChart3,
  ArrowRight,
  Search,
  ChevronRight
} from "lucide-react"

const sections = [
  {
    title: "Prise en main",
    icon: Sparkles,
    color: "from-teal-500 to-cyan-500",
    articles: [
      { title: "Introduction à MarkdownPro", href: "#intro" },
      { title: "Créer votre premier README", href: "#first-readme" },
      { title: "Comprendre l'interface", href: "#interface" },
      { title: "Raccourcis clavier", href: "#shortcuts" }
    ]
  },
  {
    title: "Éditeur",
    icon: Code2,
    color: "from-blue-500 to-indigo-500",
    articles: [
      { title: "Syntaxe Markdown", href: "#markdown" },
      { title: "Formatage avancé", href: "#formatting" },
      { title: "Blocs de code", href: "#code-blocks" },
      { title: "Images et médias", href: "#media" }
    ]
  },
  {
    title: "Widgets GitHub",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    articles: [
      { title: "Ajouter des widgets", href: "#add-widgets" },
      { title: "Personnaliser les thèmes", href: "#widget-themes" },
      { title: "Stats et contributions", href: "#stats" },
      { title: "Badges et trophées", href: "#badges" }
    ]
  },
  {
    title: "Templates",
    icon: FileText,
    color: "from-purple-500 to-pink-500",
    articles: [
      { title: "Utiliser un template", href: "#use-template" },
      { title: "Templates gratuits vs Premium", href: "#template-types" },
      { title: "Personnaliser un template", href: "#customize" },
      { title: "Créer son propre template", href: "#create-template" }
    ]
  },
  {
    title: "Import & Export",
    icon: Download,
    color: "from-orange-500 to-amber-500",
    articles: [
      { title: "Importer depuis GitHub", href: "#import-github" },
      { title: "Exporter en Markdown", href: "#export-md" },
      { title: "Exporter en HTML/PDF", href: "#export-html-pdf" },
      { title: "Copier vers GitHub", href: "#copy-github" }
    ]
  },
  {
    title: "Génération IA",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    articles: [
      { title: "Comment fonctionne l'IA", href: "#ai-intro" },
      { title: "Générer un README", href: "#generate" },
      { title: "Améliorer un README existant", href: "#improve" },
      { title: "Bonnes pratiques", href: "#ai-tips" }
    ]
  }
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb orb-teal w-[500px] h-[500px] -top-40 -left-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Apprenez à utiliser{" "}
              <span className="text-gradient">MarkdownPro</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              Guides, tutoriels et références pour maîtriser toutes les fonctionnalités.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Rechercher dans la documentation..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Docs Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="card-bento group">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-2">
                  {section.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a
                        href={article.href}
                        className="flex items-center gap-2 p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-all group/link"
                      >
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        <span>{article.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-bg-darker)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Besoin d'aide supplémentaire ?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Notre équipe de support est là pour vous aider.
            </p>
            <Link href="/support" className="btn-primary inline-flex">
              Contacter le support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
