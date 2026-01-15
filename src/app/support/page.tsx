"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  HelpCircle,
  MessageCircle,
  Mail,
  BookOpen,
  Github,
  Twitter,
  ArrowRight,
  Search,
  ChevronRight,
  Clock,
  CheckCircle
} from "lucide-react"

const faqCategories = [
  {
    title: "Compte & Facturation",
    questions: [
      "Comment créer un compte ?",
      "Comment passer à Premium ?",
      "Comment annuler mon abonnement ?",
      "Quels moyens de paiement acceptez-vous ?"
    ]
  },
  {
    title: "Éditeur & Fonctionnalités",
    questions: [
      "Comment utiliser l'éditeur Markdown ?",
      "Comment ajouter des images ?",
      "Comment exporter mon document ?",
      "Comment utiliser les widgets GitHub ?"
    ]
  },
  {
    title: "Templates",
    questions: [
      "Comment utiliser un template ?",
      "Les templates sont-ils personnalisables ?",
      "Puis-je créer mon propre template ?",
      "Quelle est la différence entre gratuit et premium ?"
    ]
  }
]

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Chat en direct",
    description: "Réponse en moins de 5 minutes",
    availability: "Lun-Ven, 9h-18h",
    color: "from-teal-500 to-cyan-500",
    action: "Démarrer le chat"
  },
  {
    icon: Mail,
    title: "Email",
    description: "support@markdownpro.dev",
    availability: "Réponse sous 24h",
    color: "from-purple-500 to-pink-500",
    action: "Envoyer un email"
  },
  {
    icon: Github,
    title: "GitHub Issues",
    description: "Pour les bugs et suggestions",
    availability: "Open source",
    color: "from-gray-600 to-gray-800",
    action: "Ouvrir une issue"
  }
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb orb-teal w-[500px] h-[500px] -top-40 -right-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Comment pouvons-nous{" "}
              <span className="text-gradient">vous aider</span> ?
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              Trouvez des réponses rapides ou contactez notre équipe.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Rechercher dans l'aide..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-[var(--color-bg-darker)]">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] text-center mb-12">
            Contactez-nous
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <div key={index} className="card-bento text-center group hover:border-[var(--color-primary-dark)] transition-all">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  {option.title}
                </h3>
                <p className="text-[var(--color-text-muted)] mb-2">
                  {option.description}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mb-6 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  {option.availability}
                </p>
                <button className="btn-secondary w-full">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] text-center mb-12">
            Questions fréquentes
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {faqCategories.map((category, index) => (
              <div key={index} className="card-bento">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex}>
                      <a
                        href="#"
                        className="flex items-start gap-2 p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-all"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{question}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="section-padding bg-[var(--color-bg-darker)]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="card-bento">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Statut des services
                </h3>
                <span className="flex items-center gap-2 text-sm text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Tous les systèmes opérationnels
                </span>
              </div>
              <div className="space-y-3">
                {["API", "Éditeur", "Authentification", "Export"].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-bg-darker)]">
                    <span className="text-[var(--color-text-secondary)]">{service}</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
