"use client"

import { useSession } from "@/lib/auth-client"
import { PrismaNavbar } from "@/components/layout/prisma-navbar"
import Link from "next/link"
import { useState, useEffect } from "react"
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
  ChevronRight,
  Sparkles,
  Activity,
  Zap,
  ExternalLink,
  TrendingUp,
  Code2,
  FolderOpen,
  ArrowUpRight
} from "lucide-react"
import { GitHubImportDialog } from "@/components/dashboard/github-import-dialog"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { BorderBeam } from "@/components/magicui/border-beam"
import { motion } from "framer-motion"

// Types
interface Document {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface Stats {
  documents: number
  templates: number
  exports: number
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession()
  const [documents, setDocuments] = useState<Document[]>([])
  const [stats, setStats] = useState<Stats>({ documents: 0, templates: 0, exports: 12 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchDocuments()
    }
  }, [session])

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents')
      if (response.ok) {
        const data = await response.json()
        const docs = Array.isArray(data) ? data : data.documents || []
        setDocuments(docs)
        setStats(prev => ({ ...prev, documents: docs.length }))
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

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
        {/* Header avec animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 flex items-center justify-center text-[var(--color-bg-dark)] font-bold text-2xl shadow-lg">
                {user.name?.[0] || user.email?.[0] || 'U'}
              </div>
              {isPremium && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                  <Crown className="w-3 h-3 text-[var(--color-bg-dark)]" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                  Bienvenue, {user.name || 'Utilisateur'}
                </h1>
                {isAdmin && (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
                    ADMIN
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
        </motion.div>

        {/* Stats Cards avec animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <StatCard
            icon={<FileText className="w-5 h-5" />}
            label="Documents"
            value={stats.documents}
            sublabel="README créés"
            color="teal"
            delay={0}
          />
          <StatCard
            icon={<Crown className="w-5 h-5" />}
            label="Templates"
            value={stats.templates}
            sublabel="Premium disponibles"
            color="yellow"
            delay={0.1}
          />
          <StatCard
            icon={<Download className="w-5 h-5" />}
            label="Exports"
            value={stats.exports}
            sublabel="Ce mois-ci"
            color="purple"
            delay={0.2}
          />
          <StatCard
            icon={<Zap className="w-5 h-5" />}
            label="Plan"
            value={isPremium ? "PRO" : "FREE"}
            isText
            sublabel={isPremium ? "Actif" : "Limité à 500 car."}
            color={isPremium ? "teal" : "gray"}
            highlight={!isPremium}
            delay={0.3}
          />
        </motion.div>

        {/* Admin Panel */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-surface-dark)] to-red-500/5 border border-red-500/30 p-6"
          >
            <BorderBeam colorFrom="#ef4444" colorTo="#f97316" />
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
          </motion.div>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Documents - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  Documents récents
                </h2>
              </div>
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
              {loading ? (
                <div className="card-bento animate-pulse">
                  <div className="h-4 bg-[var(--color-surface-elevated)] rounded w-1/3 mb-3"></div>
                  <div className="h-3 bg-[var(--color-surface-elevated)] rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-[var(--color-surface-elevated)] rounded w-1/2"></div>
                </div>
              ) : documents.length > 0 ? (
                documents.slice(0, 5).map((document, index) => (
                  <DocumentCard key={document.id} document={document} index={index} />
                ))
              ) : (
                <EmptyState
                  icon={<FileText className="w-12 h-12" />}
                  title="Aucun document"
                  description="Créez votre premier README pour commencer"
                  action={{ label: "Créer un README", href: "/editor" }}
                />
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="card-bento">
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--color-primary)]" />
                Actions rapides
              </h3>
              <div className="space-y-2">
                <QuickActionButton
                  href="/editor"
                  icon={<Plus className="w-4 h-4" />}
                  label="Nouveau README"
                />
                <QuickActionButton
                  href="/templates"
                  icon={<FileText className="w-4 h-4" />}
                  label="Parcourir les templates"
                />
                <QuickActionButton
                  href="https://github.com"
                  icon={<Code2 className="w-4 h-4" />}
                  label="Documentation"
                  external
                />
              </div>
            </div>

            {/* Upgrade Card */}
            {!isPremium && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-surface-dark)] to-yellow-500/5 border border-yellow-500/30 p-6">
                <BorderBeam colorFrom="#eab308" colorTo="#f59e0b" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[var(--color-bg-dark)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">
                      Passez au Premium
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Débloquez tout le potentiel
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4 text-sm text-[var(--color-text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    Caractères illimités
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    Templates premium inclus
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    Import GitHub repos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    Widgets & badges avancés
                  </li>
                </ul>
                <Link href="/pricing" className="block w-full btn-primary text-center bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400">
                  <Crown className="w-4 h-4" />
                  Passer au Premium - 5€
                </Link>
              </div>
            )}

            {/* Stats Mini */}
            <div className="card-bento">
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
                Activité
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">Documents ce mois</span>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{stats.documents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">Exports totaux</span>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{stats.exports}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">Statut</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isPremium ? 'bg-teal-500/10 text-teal-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {isPremium ? 'Premium' : 'Gratuit'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
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
  color,
  highlight,
  delay,
  isText
}: {
  icon: React.ReactNode
  label: string
  value: number | string
  sublabel: string
  color: string
  highlight?: boolean
  delay: number
  isText?: boolean
}) {
  const colorClasses: Record<string, string> = {
    teal: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30',
    yellow: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    gray: 'from-gray-500/10 to-gray-500/10 border-gray-500/30'
  }

  const iconColorClasses: Record<string, string> = {
    teal: 'text-teal-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    gray: 'text-gray-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color]} border p-5`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
        <span className={iconColorClasses[color]}>{icon}</span>
      </div>
      <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">
        {isText ? value : <NumberTicker value={value as number} />}
      </p>
      <p className="text-xs text-[var(--color-text-muted)]">
        {highlight ? (
          <Link href="/pricing" className="text-yellow-500 hover:underline flex items-center gap-1">
            {sublabel}
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        ) : (
          sublabel
        )}
      </p>
    </motion.div>
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
      className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-dark)]/50 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5 transition-all"
    >
      <span className="text-red-400">{icon}</span>
      <span className="text-[var(--color-text-secondary)]">{label}</span>
      <ChevronRight className="w-4 h-4 ml-auto text-[var(--color-text-muted)]" />
    </Link>
  )
}

function DocumentCard({ document, index }: { document: Document; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card-bento group hover:border-[var(--color-primary)]/50"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)]">
              {document.title}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Modifié le {new Date(document.updatedAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/editor?id=${document.id}`} className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            <Edit className="w-4 h-4" />
          </Link>
          <button className="p-2 rounded-lg hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] hover:text-red-400">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 pl-13">
        {document.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
      </p>
    </motion.div>
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

function QuickActionButton({
  href,
  icon,
  label,
  external
}: {
  href: string
  icon: React.ReactNode
  label: string
  external?: boolean
}) {
  const Component = external ? 'a' : Link
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Component
      href={href}
      {...props}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-surface-elevated)] transition-colors group"
    >
      <span className="text-[var(--color-primary)]">{icon}</span>
      <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]">{label}</span>
      {external && <ExternalLink className="w-3 h-3 ml-auto text-[var(--color-text-muted)]" />}
    </Component>
  )
}
