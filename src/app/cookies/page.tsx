"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import { Cookie, ArrowLeft, Check } from "lucide-react"

const cookieTypes = [
  {
    name: "Cookies essentiels",
    description: "Nécessaires au fonctionnement du site. Ils permettent l'authentification et la sécurité.",
    required: true,
    examples: ["Session utilisateur", "Token CSRF", "Préférences de langue"]
  },
  {
    name: "Cookies analytiques",
    description: "Nous aident à comprendre comment les visiteurs utilisent le site pour l'améliorer.",
    required: false,
    examples: ["Google Analytics", "Pages visitées", "Temps passé"]
  },
  {
    name: "Cookies fonctionnels",
    description: "Permettent des fonctionnalités améliorées et une personnalisation.",
    required: false,
    examples: ["Thème sombre/clair", "Derniers documents ouverts", "Préférences d'éditeur"]
  }
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      <section className="relative pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                Politique des cookies
              </h1>
              <p className="text-[var(--color-text-muted)]">
                Dernière mise à jour : 15 janvier 2025
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                Qu'est-ce qu'un cookie ?
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web.
                Les cookies permettent au site de mémoriser vos actions et préférences (connexion, langue, taille de police, etc.)
                pendant une période donnée, pour que vous n'ayez pas à les ressaisir à chaque visite.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Types de cookies utilisés
              </h2>

              {cookieTypes.map((type, index) => (
                <div key={index} className="card-bento">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      {type.name}
                    </h3>
                    {type.required ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                        Requis
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/30">
                        Optionnel
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--color-text-secondary)] mb-4">
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, exIndex) => (
                      <span
                        key={exIndex}
                        className="px-3 py-1 text-xs rounded-lg bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                Gérer vos préférences
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer
                tous les cookies déjà présents sur votre appareil et configurer la plupart des navigateurs pour
                qu'ils les bloquent.
              </p>
              <div className="space-y-3">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                >
                  <Check className="w-4 h-4" />
                  Google Chrome
                </a>
                <a
                  href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                >
                  <Check className="w-4 h-4" />
                  Mozilla Firefox
                </a>
                <a
                  href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                >
                  <Check className="w-4 h-4" />
                  Safari
                </a>
                <a
                  href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                >
                  <Check className="w-4 h-4" />
                  Microsoft Edge
                </a>
              </div>
            </div>

            <div className="card-bento">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                Contact
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Pour toute question concernant notre utilisation des cookies :
              </p>
              <p className="text-[var(--color-primary)] mt-2">
                privacy@markdownpro.dev
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
