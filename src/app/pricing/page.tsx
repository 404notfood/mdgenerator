"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  Check,
  X,
  HelpCircle,
  Crown,
  Zap,
  Users,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  CreditCard,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Pour découvrir et tester",
    popular: false,
    features: [
      { name: "5 documents", included: true },
      { name: "500 caractères max", included: true },
      { name: "Templates gratuits", included: true },
      { name: "Export Markdown", included: true },
      { name: "3 widgets GitHub", included: true },
      { name: "Templates premium", included: false },
      { name: "Génération IA", included: false },
      { name: "Export HTML/PDF", included: false },
      { name: "Support prioritaire", included: false }
    ],
    cta: "Commencer gratuitement",
    href: "/auth/signup"
  },
  {
    name: "Premium",
    price: "9",
    description: "Pour les développeurs sérieux",
    popular: true,
    features: [
      { name: "Documents illimités", included: true },
      { name: "Caractères illimités", included: true },
      { name: "Tous les templates", included: true },
      { name: "Export multi-formats", included: true },
      { name: "Tous les widgets GitHub", included: true },
      { name: "Templates premium inclus", included: true },
      { name: "Génération IA illimitée", included: true },
      { name: "Export HTML/PDF", included: true },
      { name: "Support prioritaire", included: true }
    ],
    cta: "Passer au Premium",
    href: "/buy-premium"
  },
  {
    name: "Team",
    price: "Sur mesure",
    description: "Pour les équipes",
    popular: false,
    features: [
      { name: "Tout Premium inclus", included: true },
      { name: "Collaboration équipe", included: true },
      { name: "SSO / SAML", included: true },
      { name: "API dédiée", included: true },
      { name: "Dashboard analytics", included: true },
      { name: "Gestion des rôles", included: true },
      { name: "Onboarding dédié", included: true },
      { name: "SLA garanti", included: true },
      { name: "Support 24/7", included: true }
    ],
    cta: "Nous contacter",
    href: "/contact"
  }
]

const comparisonFeatures = [
  { name: "Documents", free: "5", premium: "Illimité", team: "Illimité" },
  { name: "Caractères par document", free: "500", premium: "Illimité", team: "Illimité" },
  { name: "Templates gratuits", free: true, premium: true, team: true },
  { name: "Templates premium", free: false, premium: true, team: true },
  { name: "Export Markdown", free: true, premium: true, team: true },
  { name: "Export HTML/PDF", free: false, premium: true, team: true },
  { name: "Widgets GitHub", free: "3", premium: "Tous (8+)", team: "Tous (8+)" },
  { name: "Génération IA", free: false, premium: true, team: true },
  { name: "Import GitHub repos", free: false, premium: true, team: true },
  { name: "Collaboration", free: false, premium: false, team: true },
  { name: "API", free: false, premium: false, team: true },
  { name: "Support", free: "Communauté", premium: "Prioritaire", team: "24/7" }
]

const faqs = [
  {
    question: "Puis-je utiliser la version gratuite indéfiniment ?",
    answer: "Oui ! La version gratuite inclut toutes les fonctionnalités de base pour créer des README. Aucune limite de temps, vous pouvez l'utiliser aussi longtemps que vous le souhaitez."
  },
  {
    question: "L'achat Premium est-il unique ou récurrent ?",
    answer: "L'achat Premium est unique. Une fois payé, vous gardez l'accès à toutes les fonctionnalités à vie. Pas d'abonnement, pas de frais récurrents !"
  },
  {
    question: "Comment fonctionnent les paiements ?",
    answer: "Les paiements sont sécurisés et traités par Stripe. Nous acceptons toutes les cartes de crédit principales ainsi que Apple Pay et Google Pay."
  },
  {
    question: "Puis-je tester Premium avant d'acheter ?",
    answer: "Oui ! Visitez notre page de démonstration pour voir toutes les fonctionnalités premium en action. Vous pouvez aussi demander un essai gratuit en nous contactant."
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer: "Nous offrons une garantie satisfait ou remboursé de 14 jours. Si Premium ne répond pas à vos attentes, contactez-nous pour un remboursement complet."
  }
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="orb orb-teal w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <Crown className="w-4 h-4" />
              <span>Tarification simple</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Des prix{" "}
              <span className="text-gradient">transparents</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)] mb-8">
              Commencez gratuitement, passez à Premium quand vous êtes prêt.
              Pas d'abonnement, pas de surprise.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Garantie 14 jours</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Achat unique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card ${plan.popular ? 'pricing-popular' : ''}`}
              >
                {plan.popular && <div className="pricing-badge">Le plus populaire</div>}

                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">{plan.description}</p>

                <div className="mb-8">
                  {plan.price === "Sur mesure" ? (
                    <span className="text-3xl font-bold text-[var(--color-text-primary)]">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold text-[var(--color-text-primary)]">{plan.price}</span>
                      <span className="text-[var(--color-text-muted)] ml-2">euros</span>
                      {plan.price !== "0" && (
                        <span className="text-sm text-[var(--color-text-muted)] block mt-1">
                          paiement unique
                        </span>
                      )}
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-muted)]'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-dark)]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-[var(--color-bg-darker)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Comparaison détaillée
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Tout ce qui est inclus dans chaque plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-[var(--color-border-dark)]">
                  <th className="text-left py-4 px-4 font-semibold text-[var(--color-text-primary)]">
                    Fonctionnalités
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-text-secondary)]">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-primary)]">
                    Premium
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[var(--color-text-secondary)]">
                    Team
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-dark)]">
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-[var(--color-surface-dark)]/30' : ''}>
                    <td className="py-4 px-4 text-[var(--color-text-secondary)]">
                      {feature.name}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.free === 'boolean' ? (
                        feature.free ? (
                          <Check className="w-5 h-5 text-[var(--color-primary)] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-[var(--color-text-muted)] mx-auto" />
                        )
                      ) : (
                        <span className="text-[var(--color-text-muted)]">{feature.free}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.premium === 'boolean' ? (
                        feature.premium ? (
                          <Check className="w-5 h-5 text-[var(--color-primary)] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-[var(--color-text-muted)] mx-auto" />
                        )
                      ) : (
                        <span className="text-[var(--color-primary)] font-medium">{feature.premium}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.team === 'boolean' ? (
                        feature.team ? (
                          <Check className="w-5 h-5 text-[var(--color-primary)] mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-[var(--color-text-muted)] mx-auto" />
                        )
                      ) : (
                        <span className="text-[var(--color-text-secondary)]">{feature.team}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="badge-floating inline-flex mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card-bento cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--color-text-primary)] pr-4">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0" />
                  )}
                </div>
                {openFaq === index && (
                  <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10" />
        <div className="orb orb-teal w-[500px] h-[500px] -bottom-40 left-1/2 -translate-x-1/2 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-6">
              Prêt à créer des README{" "}
              <span className="text-gradient">exceptionnels</span> ?
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] mb-10">
              Rejoignez plus de 10,000 développeurs. Gratuit pour toujours,
              sans carte bancaire.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/premium-demo" className="btn-secondary text-lg px-8 py-4">
                <Sparkles className="w-5 h-5" />
                Voir la démo Premium
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
