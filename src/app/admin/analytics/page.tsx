"use client"

import { useSession } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { 
  Users, 
  ShoppingCart, 
  Eye, 
  DollarSign,
  TrendingUp,
  Calendar,
  Download
} from "lucide-react"
import Link from "next/link"

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

export default function AdminAnalyticsPage() {
  const { data: session, isPending } = useSession()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is admin
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
    return <div className="container mx-auto py-12 px-4 text-center">Chargement...</div>
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
        <p className="text-gray-600 mb-6">Vous devez être administrateur pour accéder à cette page.</p>
        <Button asChild>
          <Link href="/dashboard">Retour au dashboard</Link>
        </Button>
      </div>
    )
  }

  if (loading || !analytics) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Statistiques
          <Badge variant="destructive" className="ml-2">ADMIN</Badge>
        </h1>
        <p>Chargement des données...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Statistiques
            <Badge variant="destructive" className="ml-2">ADMIN</Badge>
          </h1>
          <p className="text-gray-600">Analyses des performances et revenus</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter CSV
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">← Retour</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +12% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achats totaux</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPurchases}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +8% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(analytics.totalRevenue / 100).toFixed(2)}€
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +15% ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visites totales</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalVisits}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +22% ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Achats récents */}
        <Card>
          <CardHeader>
            <CardTitle>Achats récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{purchase.userName}</p>
                    <p className="text-sm text-gray-600">{purchase.templateName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(purchase.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {(purchase.amount / 100).toFixed(2)}€
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates populaires */}
        <Card>
          <CardHeader>
            <CardTitle>Templates les plus vendus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularTemplates.map((template, index) => (
                <div key={template.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-gray-600">
                        {template.purchaseCount} ventes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {(template.revenue / 100).toFixed(2)}€
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques mensuelles */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Évolution mensuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Mois</th>
                  <th className="text-center py-2">Nouveaux utilisateurs</th>
                  <th className="text-center py-2">Achats</th>
                  <th className="text-center py-2">Revenus</th>
                </tr>
              </thead>
              <tbody>
                {analytics.monthlyStats.map((stat) => (
                  <tr key={stat.month} className="border-b">
                    <td className="py-2">{stat.month}</td>
                    <td className="text-center py-2">{stat.users}</td>
                    <td className="text-center py-2">{stat.purchases}</td>
                    <td className="text-center py-2 font-bold text-green-600">
                      {(stat.revenue / 100).toFixed(2)}€
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}