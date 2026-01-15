"use client"

import Link from "next/link"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import {
  Code2,
  Key,
  Lock,
  Zap,
  ArrowRight,
  Copy,
  Check,
  Terminal
} from "lucide-react"
import { useState } from "react"

const endpoints = [
  {
    method: "GET",
    path: "/api/documents",
    description: "Liste tous vos documents",
    auth: true
  },
  {
    method: "POST",
    path: "/api/documents",
    description: "Créer un nouveau document",
    auth: true
  },
  {
    method: "GET",
    path: "/api/documents/:id",
    description: "Récupérer un document spécifique",
    auth: true
  },
  {
    method: "PUT",
    path: "/api/documents/:id",
    description: "Mettre à jour un document",
    auth: true
  },
  {
    method: "DELETE",
    path: "/api/documents/:id",
    description: "Supprimer un document",
    auth: true
  },
  {
    method: "GET",
    path: "/api/templates",
    description: "Liste tous les templates disponibles",
    auth: false
  },
  {
    method: "POST",
    path: "/api/ai/generate",
    description: "Générer un README avec l'IA",
    auth: true
  }
]

const methodColors: Record<string, string> = {
  GET: "bg-green-500/10 text-green-400 border-green-500/30",
  POST: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  DELETE: "bg-red-500/10 text-red-400 border-red-500/30"
}

export default function ApiDocsPage() {
  const [copied, setCopied] = useState(false)

  const copyApiKey = () => {
    navigator.clipboard.writeText("mp_sk_xxxxxxxxxxxxx")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="orb orb-cyan w-[500px] h-[500px] -top-40 -right-40 opacity-20" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge-floating inline-flex mb-6">
              <Terminal className="w-4 h-4" />
              <span>API Reference</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
              Documentation{" "}
              <span className="text-gradient">API</span>
            </h1>

            <p className="text-xl text-[var(--color-text-secondary)]">
              Intégrez MarkdownPro dans vos applications avec notre API REST.
            </p>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="section-padding bg-[var(--color-bg-darker)]">
        <div className="container-custom max-w-4xl">
          <div className="card-bento mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Authentification
              </h2>
            </div>

            <p className="text-[var(--color-text-secondary)] mb-6">
              Toutes les requêtes authentifiées nécessitent une clé API dans l'en-tête Authorization.
            </p>

            <div className="bg-[var(--color-bg-darker)] rounded-xl p-4 font-mono text-sm">
              <div className="flex items-center justify-between">
                <code className="text-[var(--color-text-muted)]">
                  <span className="text-purple-400">Authorization:</span> Bearer mp_sk_xxxxxxxxxxxxx
                </code>
                <button
                  onClick={copyApiKey}
                  className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 mb-8">
            <Lock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-sm text-yellow-200">
              <strong>Note :</strong> L'API est disponible uniquement pour les utilisateurs Premium et Team.
              <Link href="/pricing" className="underline ml-1">Voir les tarifs</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
            Endpoints disponibles
          </h2>

          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="card-bento flex items-center gap-4 hover:border-[var(--color-primary-dark)] transition-all cursor-pointer"
              >
                <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${methodColors[endpoint.method]}`}>
                  {endpoint.method}
                </span>
                <code className="text-[var(--color-primary)] font-mono flex-1">
                  {endpoint.path}
                </code>
                <span className="text-[var(--color-text-muted)] text-sm hidden md:block">
                  {endpoint.description}
                </span>
                {endpoint.auth && (
                  <Lock className="w-4 h-4 text-[var(--color-text-muted)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="section-padding bg-[var(--color-bg-darker)]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
            Exemple de requête
          </h2>

          <div className="card-bento">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
                POST
              </span>
              <code className="text-[var(--color-text-muted)]">/api/ai/generate</code>
            </div>

            <pre className="bg-[var(--color-bg-darker)] rounded-xl p-4 overflow-x-auto">
              <code className="text-sm font-mono">
{`curl -X POST https://markdownpro.dev/api/ai/generate \\
  -H "Authorization: Bearer mp_sk_xxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "projectName": "Mon Projet",
    "description": "Une application web moderne",
    "tech": ["React", "TypeScript", "Tailwind"]
  }'`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}
