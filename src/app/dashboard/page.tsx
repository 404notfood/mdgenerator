"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import Link from "next/link"
import {
  FileText,
  Crown,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
  Github,
  Settings,
  BarChart3,
  Users,
  LogOut,
  ChevronRight,
  Sparkles,
  Activity,
  Zap,
  ExternalLink
} from "lucide-react"
import { GitHubImportDialog } from "@/components/dashboard/github-import-dialog"

// Types
interface Document {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface Purchase {
  id: string
  templateId: string
  templateName: string
  amount: number
  createdAt: Date
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED'
}

// Demo data
const demoDocuments: Document[] = [
  {
    id: '1',
    title: 'Mon Super Projet',
    content: '# Mon Super Projet\n\nUn projet incroyable avec React et Next.js qui permet de faire des choses fantastiques...',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-01-16')
  },
  {
    id: '2',
    title: 'API REST Documentation',
    content: '# API REST Documentation\n\nDocumentation complète de notre API REST avec authentification JWT...',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2025-01-12')
  }
]

const demoPurchases: Purchase[] = [
  {
    id: '1',
    templateId: 'startup-mvp',
    templateName: 'Startup MVP',
    amount: 1500,
    createdAt: new Date('2025-01-08'),
    status: 'SUCCEEDED'
  }
]

export default function DashboardPage() {
  const { data: session, isPending } = useSession()

  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)]">
        <PrismaNavbar />
        <div className="container-custom py-32 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center animate-pulse">
            <Activity className="w-8 h-8 text-[var(--color-bg-dark)]" />
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg">Chargement...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)]">
        <PrismaNavbar />
        <div className="container-custom py-32 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] flex items-center justify-center">
              <Users className="w-10 h-10 text-[var(--color-text-muted)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              Accès refusé
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Vous devez être connecté pour accéder à votre dashboard.
            </p>
            <Link href="/auth/signin" className="btn-primary inline-flex">
              Se connecter
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const user = session.user
  const isAdmin = (user as any).role === 'ADMIN'
  const isPremium = (user as any).role === 'PREMIUM' || isAdmin

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      <PrismaNavbar />

      <div className="container-custom py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center text-[var(--color-bg-dark)] font-bold text-xl">
              {user.name?.[0] || user.email?.[0] || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                  Bienvenue, {user.name || 'Utilisateur'}
                </h1>
                {isAdmin && (
                  <span className="badge-floating text-xs py-1 px-2 bg-red-500/10 border-red-500/30 text-red-400">
                    ADMIN
                  </span>
                )}
                {isPremium && !isAdmin && (
                  <span className="badge-floating text-xs py-1 px-2 bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>
              <p className="text-[var(--color-text-muted)]">{user.email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            {isPremium && (
              <GitHubImportDialog>
                <button className="btn-secondary">
                  <Github className="w-4 h-4" />
                  Importer de GitHub
                </button>
              </GitHubImportDialog>
            )}
            <Link href="/editor" className="btn-primary">
              <Plus className="w-4 h-4" />
              Nouveau README
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={<FileText className="w-5 h-5" />}
            label="Documents"
            value={demoDocuments.length.toString()}
            sublabel="README créés"
          />
          <StatCard
            icon={<Crown className="w-5 h-5" />}
            label="Templates"
            value={demoPurchases.length.toString()}
            sublabel="Premium achetés"
          />
          <StatCard
            icon={<Download className="w-5 h-5" />}
            label="Exports"
            value="12"
            sublabel="Ce mois-ci"
          />
          <StatCard
            icon={<Zap className="w-5 h-5" />}
            label="Plan"
            value={isPremium ? "Premium" : "Gratuit"}
            sublabel={isPremium ? "Actif" : "Limité à 500 car."}
            highlight={!isPremium}
          />
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <div className="mb-10 card-bento border-red-500/30 bg-gradient-to-br from-[var(--color-surface-dark)] to-red-500/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Panneau d'administration
                </h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Gérez les templates, utilisateurs et paramètres
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <AdminLink href="/admin/templates" icon={<FileText className="w-4 h-4" />} label="Gérer les templates" />
              <AdminLink href="/admin/settings" icon={<Settings className="w-4 h-4" />} label="Configuration" />
              <AdminLink href="/admin/analytics" icon={<BarChart3 className="w-4 h-4" />} label="Statistiques" />
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Documents */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Documents récents
              </h2>
              <div className="flex gap-2">
                {isPremium && (
                  <GitHubImportDialog>
                    <button className="btn-ghost text-sm">
                      <Github className="w-4 h-4" />
                      GitHub
                    </button>
                  </GitHubImportDialog>
                )}
                <Link href="/editor" className="btn-ghost text-sm">
                  <Plus className="w-4 h-4" />
                  Nouveau
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {demoDocuments.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}

              {demoDocuments.length === 0 && (
                <EmptyState
                  icon={<FileText className="w-12 h-12" />}
                  title="Aucun document"
                  description="Créez votre premier README pour commencer"
                  action={{ label: "Créer un README", href: "/editor" }}
                />
              )}
            </div>
          </div>

          {/* Templates Premium */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Templates Premium
              </h2>
              <Link href="/templates" className="btn-ghost text-sm">
                Parcourir
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {demoPurchases.map((purchase) => (
                <PurchaseCard key={purchase.id} purchase={purchase} />
              ))}

              {demoPurchases.length === 0 && (
                <EmptyState
                  icon={<Crown className="w-12 h-12" />}
                  title="Aucun template premium"
                  description="Découvrez nos templates professionnels"
                  action={{ label: "Parcourir", href: "/templates" }}
                />
              )}

              {/* Upgrade Card */}
              {!isPremium && (
                <div className="card-bento border-yellow-500/30 bg-gradient-to-br from-[var(--color-surface-dark)] to-yellow-500/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[var(--color-bg-dark)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">
                        Passez au Premium
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Débloquez toutes les fonctionnalités
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm text-[var(--color-text-secondary)]">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">*</span> Caractères illimités
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">*</span> 100+ templates premium
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">*</span> Tous les widgets GitHub
                    </li>
                  </ul>
                  <Link href="/pricing" className="block w-full btn-primary text-center bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400">
                    <Crown className="w-4 h-4" />
                    Passer au Premium - 5 euros
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <QuickAction
            href="/editor"
            icon={<Plus className="w-5 h-5" />}
            title="Créer un README"
            description="Nouveau document vide"
          />
          <QuickAction
            href="/templates"
            icon={<FileText className="w-5 h-5" />}
            title="Choisir un template"
            description="100+ templates disponibles"
          />
          <QuickAction
            href="https://github.com"
            icon={<Github className="w-5 h-5" />}
            title="Documentation"
            description="Guide et tutoriels"
            external
          />
        </div>
      </div>
    </div>
  )
}

// Sub-components
function StatCard({
  icon,
  label,
  value,
  sublabel,
  highlight
}: {
  icon: React.ReactNode
  label: string
  value: string
  sublabel: string
  highlight?: boolean
}) {
  return (
    <div className={`card-bento ${highlight ? 'border-yellow-500/30' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
        <span className="text-[var(--color-primary)]">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{value}</p>
      <p className="text-xs text-[var(--color-text-muted)]">
        {highlight ? (
          <Link href="/pricing" className="text-yellow-500 hover:underline">
            {sublabel}
          </Link>
        ) : (
          sublabel
        )}
      </p>
    </div>
  )
}

function AdminLink({
  href,
  icon,
  label
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-dark)]/50 border border-red-500/20 hover:border-red-500/40 transition-colors"
    >
      <span className="text-red-400">{icon}</span>
      <span className="text-[var(--color-text-secondary)]">{label}</span>
      <ChevronRight className="w-4 h-4 ml-auto text-[var(--color-text-muted)]" />
    </Link>
  )
}

function DocumentCard({ document }: { document: Document }) {
  return (
    <div className="card-bento group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-[var(--color-text-primary)] truncate pr-4">
          {document.title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-red-400">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
        {document.content.substring(0, 100)}...
      </p>
      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {document.createdAt.toLocaleDateString('fr-FR')}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {document.updatedAt.toLocaleDateString('fr-FR')}
        </span>
      </div>
    </div>
  )
}

function PurchaseCard({ purchase }: { purchase: Purchase }) {
  return (
    <div className="card-bento">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-yellow-500" />
          <h3 className="font-semibold text-[var(--color-text-primary)]">
            {purchase.templateName}
          </h3>
        </div>
        <span className={`badge-floating text-xs py-1 ${
          purchase.status === 'SUCCEEDED'
            ? 'bg-green-500/10 border-green-500/30 text-green-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {purchase.status === 'SUCCEEDED' ? 'Actif' : 'Echoué'}
        </span>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">
        Acheté le {purchase.createdAt.toLocaleDateString('fr-FR')}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-text-primary)]">
          {(purchase.amount / 100).toFixed(2)} euros
        </span>
        <button className="btn-primary text-sm py-2 px-4">
          Utiliser
        </button>
      </div>
    </div>
  )
}

function EmptyState({
  icon,
  title,
  description,
  action
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: { label: string; href: string }
}) {
  return (
    <div className="card-bento text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-text-muted)]">
        {icon}
      </div>
      <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">{description}</p>
      <Link href={action.href} className="btn-primary inline-flex">
        {action.label}
      </Link>
    </div>
  )
}

function QuickAction({
  href,
  icon,
  title,
  description,
  external
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  external?: boolean
}) {
  const Component = external ? 'a' : Link
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Component
      href={href}
      {...props}
      className="card-bento flex items-center gap-4 hover:border-[var(--color-primary)] transition-colors"
    >
      <div className="feature-icon flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
          {title}
          {external && <ExternalLink className="w-3 h-3 text-[var(--color-text-muted)]" />}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
    </Component>
  )
}
