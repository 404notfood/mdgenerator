"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import { Shield, ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                Politique de confidentialité
              </h1>
              <p className="text-[var(--color-text-muted)]">
                Dernière mise à jour : 15 janvier 2025
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                1. Collecte des données
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Nous collectons les informations suivantes lorsque vous utilisez MarkdownPro :
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] space-y-2">
                <li>Informations de compte (email, nom, photo de profil via GitHub)</li>
                <li>Documents et contenus que vous créez</li>
                <li>Données d'utilisation (pages visitées, fonctionnalités utilisées)</li>
                <li>Informations de paiement (traitées par Stripe, non stockées chez nous)</li>
              </ul>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                2. Utilisation des données
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] space-y-2">
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience</li>
                <li>Communiquer avec vous (support, mises à jour)</li>
                <li>Assurer la sécurité de la plateforme</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                3. Partage des données
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations avec :
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] space-y-2 mt-4">
                <li>Nos prestataires de services (hébergement, paiement)</li>
                <li>Les autorités si requis par la loi</li>
              </ul>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                4. Sécurité
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :
                chiffrement SSL/TLS, accès restreint, sauvegardes régulières, et audits de sécurité.
              </p>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                5. Vos droits
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement ("droit à l'oubli")</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
              <p className="text-[var(--color-text-muted)] mt-4">
                Pour exercer ces droits, contactez-nous à : privacy@markdownpro.dev
              </p>
            </div>

            <div className="card-bento">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                6. Contact
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Pour toute question concernant cette politique, contactez notre DPO :
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
