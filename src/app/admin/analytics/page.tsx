"use client"

import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
  Users,
  ShoppingCart,
  Eye,
  DollarSign,
  TrendingUp,
  Download,
  ArrowLeft,
  Loader2,
  X,
  BarChart3,
  Package,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { NumberTicker } from "@/components/magicui/number-ticker"

interface Analytics {
  totalUsers: number
  totalPurchases: number
  totalRevenue: number
  totalVisits: number
  recentPurchases: Array<{
    id: string
    userName: string
    templateName: string
    amount: number
    createdAt: string
  }>
  popularTemplates: Array<{
    id: string
    name: string
    purchaseCount: number
    revenue: number
  }>
  monthlyStats: Array<{
    month: string
    users: number
    purchases: number
    revenue: number
  }>
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  prefix = "",
  suffix = "",
  delay = 0
}: {
  title: string
  value: number
  icon: React.ElementType
  trend?: string
  color: string
  prefix?: string
  suffix?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)] relative overflow-hidden group hover:border-[var(--color-primary)]/30 transition-all"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:opacity-10 transition-opacity`} />

      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-[var(--color-text-muted)]">{title}</p>
        <p className="text-3xl font-bold text-[var(--color-text-primary)]">
          {prefix}
          <NumberTicker value={value} />
          {suffix}
        </p>
      </div>
    </motion.div>
  )
}

export default function AdminAnalyticsPage() {
  const { data: session, isPending } = useSession()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  const isAdmin = session && (session.user as any).role === 'ADMIN'

  useEffect(() => {
    if (!isAdmin) return
    loadAnalytics()
  }, [isAdmin])

  const loadAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Accès refusé</h1>
          <p className="text-[var(--color-text-muted)] mb-6">Vous devez être administrateur pour accéder à cette page.</p>
          <Button asChild className="btn-primary">
            <Link href="/dashboard">Retour au dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto text-[var(--color-primary)] animate-spin mb-4" />
          <p className="text-[var(--color-text-muted)]">Chargement des statistiques...</p>
        </div>
      </div>
    )
  }

  // Default analytics if null
  const stats = analytics || {
    totalUsers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    totalVisits: 0,
    recentPurchases: [],
    popularTemplates: [],
    monthlyStats: []
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border-dark)] bg-[var(--color-surface-dark)]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)]/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
                    Statistiques
                  </h1>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Analyses des performances et revenus
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-[var(--color-border-dark)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter CSV
              </Button>
              <span className="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/30">
                ADMIN
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Utilisateurs totaux"
            value={stats.totalUsers}
            icon={Users}
            color="from-blue-500 to-cyan-500"
            delay={0}
          />
          <StatCard
            title="Achats totaux"
            value={stats.totalPurchases}
            icon={ShoppingCart}
            color="from-purple-500 to-pink-500"
            delay={0.1}
          />
          <StatCard
            title="Revenus totaux"
            value={Math.round(stats.totalRevenue / 100)}
            icon={DollarSign}
            color="from-green-500 to-emerald-500"
            suffix="€"
            delay={0.2}
          />
          <StatCard
            title="Documents créés"
            value={Math.round(stats.totalVisits / 10)}
            icon={Eye}
            color="from-orange-500 to-red-500"
            delay={0.3}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Achats récents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <h2 className="font-semibold text-[var(--color-text-primary)]">Achats récents</h2>
            </div>

            <div className="space-y-3">
              {stats.recentPurchases.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-3" />
                  <p className="text-[var(--color-text-muted)]">Aucun achat récent</p>
                </div>
              ) : (
                stats.recentPurchases.map((purchase, index) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {purchase.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">{purchase.userName}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">{purchase.templateName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">{(purchase.amount / 100).toFixed(2)}€</p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {new Date(purchase.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Templates populaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="font-semibold text-[var(--color-text-primary)]">Templates les plus vendus</h2>
            </div>

            <div className="space-y-3">
              {stats.popularTemplates.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-3" />
                  <p className="text-[var(--color-text-muted)]">Aucune donnée disponible</p>
                </div>
              ) : (
                stats.popularTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-darker)] border border-[var(--color-border-dark)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500/10 text-yellow-400' :
                        index === 1 ? 'bg-gray-500/10 text-gray-400' :
                        index === 2 ? 'bg-orange-500/10 text-orange-400' :
                        'bg-[var(--color-bg-darker)] text-[var(--color-text-muted)]'
                      }`}>
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">{template.name}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">{template.purchaseCount} ventes</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-400">{(template.revenue / 100).toFixed(2)}€</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Statistiques mensuelles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-[var(--color-surface-dark)] border border-[var(--color-border-dark)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="font-semibold text-[var(--color-text-primary)]">Évolution mensuelle</h2>
          </div>

          {stats.monthlyStats.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-3" />
              <p className="text-[var(--color-text-muted)]">Aucune donnée disponible</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border-dark)]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Mois</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Nouveaux utilisateurs</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Achats</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Revenus</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.monthlyStats.map((stat, index) => (
                    <motion.tr
                      key={stat.month}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="border-b border-[var(--color-border-dark)] last:border-0 hover:bg-[var(--color-bg-darker)] transition-colors"
                    >
                      <td className="py-4 px-4 text-[var(--color-text-primary)] font-medium">{stat.month}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-blue-400">
                          <Users className="w-4 h-4" />
                          {stat.users}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-purple-400">
                          <ShoppingCart className="w-4 h-4" />
                          {stat.purchases}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-green-400">
                        {(stat.revenue / 100).toFixed(2)}€
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
