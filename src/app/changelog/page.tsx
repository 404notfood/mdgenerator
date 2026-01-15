"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  Clock,
  Sparkles,
  Bug,
  Zap,
  ArrowRight,
  Tag,
  GitCommit
} from "lucide-react"

const releases = [
  {
    version: "2.0.0",
    date: "15 Janvier 2025",
    title: "Design Prisma + Widgets GitHub",
    type: "major",
    changes: [
      { type: "feature", text: "Nouveau design inspiré de Prisma" },
      { type: "feature", text: "Widgets GitHub intégrés (stats, streak, trophées)" },
      { type: "feature", text: "Import direct de repositories GitHub" },
      { type: "feature", text: "Nouveaux templates premium" },
      { type: "improvement", text: "Performance de l'éditeur améliorée" },
      { type: "improvement", text: "Interface admin redessinée" }
    ]
  },
  {
    version: "1.5.0",
    date: "10 Décembre 2024",
    title: "Génération IA améliorée",
    type: "minor",
    changes: [
      { type: "feature", text: "Génération IA plus intelligente et contextuelle" },
      { type: "feature", text: "Support des badges personnalisés" },
      { type: "improvement", text: "Meilleure gestion des erreurs" },
      { type: "fix", text: "Correction du bug d'export PDF" }
    ]
  },
  {
    version: "1.4.0",
    date: "20 Novembre 2024",
    title: "Templates et Export",
    type: "minor",
    changes: [
      { type: "feature", text: "6 nouveaux templates professionnels" },
      { type: "feature", text: "Export HTML et PDF" },
      { type: "improvement", text: "Prévisualisation temps réel améliorée" },
      { type: "fix", text: "Corrections de bugs mineurs" }
    ]
  },
  {
    version: "1.3.0",
    date: "5 Novembre 2024",
    title: "Éditeur TipTap",
    type: "minor",
    changes: [
      { type: "feature", text: "Nouvel éditeur WYSIWYG avec TipTap" },
      { type: "feature", text: "Support du drag & drop d'images" },
      { type: "feature", text: "Coloration syntaxique des blocs de code" },
      { type: "improvement", text: "Meilleure expérience mobile" }
    ]
  },
  {
    version: "1.0.0",
    date: "1er Octobre 2024",
    title: "Lancement initial",
    type: "major",
    changes: [
      { type: "feature", text: "Éditeur Markdown de base" },
      { type: "feature", text: "Authentification GitHub" },
      { type: "feature", text: "Templates gratuits" },
      { type: "feature", text: "Export Markdown" }
    ]
  }
]

const changeTypeStyles = {
  feature: { icon: Sparkles, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
  improvement: { icon: Zap, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  fix: { icon: Bug, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" }
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb orb-purple w-[500px] h-[500px] -top-40 -right-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <GitCommit className="w-4 h-4" />
              <span>Changelog</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Historique des{" "}
              <span className="text-gradient">mises à jour</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)]">
              Toutes les nouvelles fonctionnalités, améliorations et corrections.
            </p>
          </div>
        </div>
      </section>

      {/* Changelog Timeline */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {releases.map((release, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < releases.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-[var(--color-border-dark)]" />
                )}

                <div className="card-bento">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      release.type === "major"
                        ? "bg-gradient-to-br from-teal-500 to-cyan-500"
                        : "bg-[var(--color-surface-elevated)]"
                    }`}>
                      <Tag className={`w-5 h-5 ${release.type === "major" ? "text-white" : "text-[var(--color-text-muted)]"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                          v{release.version}
                        </span>
                        {release.type === "major" && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                            Majeure
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-medium text-[var(--color-text-secondary)]">
                        {release.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-[var(--color-text-muted)]">
                        <Clock className="w-4 h-4" />
                        {release.date}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pl-16">
                    {release.changes.map((change, changeIndex) => {
                      const style = changeTypeStyles[change.type as keyof typeof changeTypeStyles]
                      return (
                        <div
                          key={changeIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg ${style.bg} border ${style.border}`}
                        >
                          <style.icon className={`w-4 h-4 mt-0.5 ${style.color}`} />
                          <span className="text-[var(--color-text-secondary)]">{change.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
