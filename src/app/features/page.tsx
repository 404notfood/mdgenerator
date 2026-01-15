"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  Sparkles,
  Code2,
  Zap,
  FileText,
  Palette,
  GitBranch,
  Users,
  Layers,
  Shield,
  Download,
  Eye,
  Wand2,
  BarChart3,
  Globe,
  ArrowRight,
  Check
} from "lucide-react"

const features = [
  {
    icon: Wand2,
    title: "Génération IA",
    description: "Décrivez votre projet et laissez l'IA générer un README professionnel complet avec badges, structure et documentation technique.",
    color: "from-purple-500 to-pink-500",
    premium: true
  },
  {
    icon: Code2,
    title: "Éditeur WYSIWYG",
    description: "Interface intuitive avec TipTap, coloration syntaxique, prévisualisation temps réel et support Markdown complet.",
    color: "from-blue-500 to-cyan-500",
    premium: false
  },
  {
    icon: BarChart3,
    title: "Widgets GitHub",
    description: "Intégrez des statistiques GitHub, graphiques de contributions, langages utilisés et trophées directement dans vos README.",
    color: "from-green-500 to-emerald-500",
    premium: false
  },
  {
    icon: FileText,
    title: "Templates Pro",
    description: "Bibliothèque complète de templates pour startups, API, projets open source, applications mobiles et plus.",
    color: "from-orange-500 to-amber-500",
    premium: true
  },
  {
    icon: Download,
    title: "Export Multi-formats",
    description: "Exportez vos documents en Markdown, HTML ou PDF. Copiez directement vers GitHub en un clic.",
    color: "from-teal-500 to-cyan-500",
    premium: true
  },
  {
    icon: GitBranch,
    title: "Import GitHub",
    description: "Importez vos repositories GitHub et générez automatiquement un README adapté à votre projet.",
    color: "from-indigo-500 to-purple-500",
    premium: true
  },
  {
    icon: Palette,
    title: "Personnalisation",
    description: "Badges personnalisés, emojis, tableaux, blocs de code avec coloration syntaxique et plus encore.",
    color: "from-pink-500 to-rose-500",
    premium: false
  },
  {
    icon: Eye,
    title: "Prévisualisation Live",
    description: "Voyez exactement comment votre README apparaîtra sur GitHub en temps réel pendant l'édition.",
    color: "from-cyan-500 to-blue-500",
    premium: false
  },
  {
    icon: Shield,
    title: "Sécurisé",
    description: "Vos données sont chiffrées et sauvegardées automatiquement. Connexion sécurisée via GitHub OAuth.",
    color: "from-red-500 to-pink-500",
    premium: false
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb orb-teal w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
        <div className="orb orb-purple w-[400px] h-[400px] bottom-0 -left-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Fonctionnalités</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Tout ce qu'il faut pour des{" "}
              <span className="text-gradient">README parfaits</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              Une suite complète d'outils pour créer, personnaliser et partager
              votre documentation professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-bento group hover:border-[var(--color-primary-dark)] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  {feature.premium && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                      Premium
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-text-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">
              Prêt à créer des README{" "}
              <span className="text-gradient">exceptionnels</span> ?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Rejoignez des milliers de développeurs qui utilisent MarkdownPro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="btn-primary">
                Commencer gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                Voir les tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
