"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import { FileText, ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-[var(--color-text-muted)]">
                Dernière mise à jour : 15 janvier 2025
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                1. Acceptation des conditions
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                En accédant et en utilisant MarkdownPro, vous acceptez d'être lié par ces conditions générales d'utilisation.
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                2. Description du service
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                MarkdownPro est une plateforme en ligne permettant de créer, éditer et exporter des documents README
                et de la documentation technique. Le service inclut un éditeur Markdown, des templates, des widgets GitHub
                et des fonctionnalités de génération IA.
              </p>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                3. Compte utilisateur
              </h2>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] space-y-2">
                <li>Vous devez fournir des informations exactes lors de l'inscription</li>
                <li>Vous êtes responsable de la confidentialité de votre compte</li>
                <li>Vous devez avoir au moins 13 ans pour utiliser le service</li>
                <li>Un compte ne peut être utilisé que par une seule personne</li>
              </ul>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                4. Utilisation acceptable
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Vous vous engagez à ne pas :
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] space-y-2">
                <li>Utiliser le service à des fins illégales</li>
                <li>Partager du contenu offensant, diffamatoire ou nuisible</li>
                <li>Tenter de contourner les mesures de sécurité</li>
                <li>Utiliser des robots ou scripts automatisés sans autorisation</li>
                <li>Revendre ou redistribuer le service sans accord</li>
              </ul>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                5. Propriété intellectuelle
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Vous conservez tous les droits sur le contenu que vous créez. En utilisant le service, vous nous accordez
                une licence limitée pour héberger et afficher votre contenu. Les templates premium sont sous licence
                d'utilisation personnelle et commerciale après achat.
              </p>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                6. Paiements et remboursements
              </h2>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] space-y-2">
                <li>Les achats Premium sont des paiements uniques, non récurrents</li>
                <li>Les prix sont indiqués en euros TTC</li>
                <li>Remboursement possible sous 14 jours si non satisfait</li>
                <li>Les templates achetés restent accessibles à vie</li>
              </ul>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                7. Limitation de responsabilité
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                MarkdownPro est fourni "tel quel". Nous ne garantissons pas que le service sera ininterrompu ou sans erreur.
                Notre responsabilité est limitée au montant que vous avez payé pour le service au cours des 12 derniers mois.
              </p>
            </div>

            <div className="card-bento mb-8">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                8. Modifications
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications importantes
                seront notifiées par email. Votre utilisation continue du service après modification constitue
                une acceptation des nouvelles conditions.
              </p>
            </div>

            <div className="card-bento">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                9. Contact
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Pour toute question concernant ces conditions :
              </p>
              <p className="text-[var(--color-primary)] mt-2">
                legal@markdownpro.dev
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
