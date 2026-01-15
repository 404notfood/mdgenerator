import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est admin
    if ((session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: "Accès refusé - Admin requis" }, { status: 403 })
    }

    // Récupérer les vrais stats depuis la base de données
    const [
      totalUsers,
      totalPurchases,
      revenueResult,
      totalDocuments,
      recentPurchases,
      popularTemplates,
      monthlyUserStats,
      monthlyPurchaseStats
    ] = await Promise.all([
      // Total utilisateurs
      prisma.user.count(),

      // Total achats réussis
      prisma.purchase.count({
        where: { status: 'SUCCEEDED' }
      }),

      // Revenus totaux (somme des achats réussis)
      prisma.purchase.aggregate({
        where: { status: 'SUCCEEDED' },
        _sum: { amount: true }
      }),

      // Total documents (pour les visites, on utilise les documents comme approximation)
      prisma.document.count(),

      // Achats récents avec détails
      prisma.purchase.findMany({
        where: { status: 'SUCCEEDED' },
        include: {
          user: { select: { name: true, email: true } },
          template: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),

      // Templates populaires (par nombre de ventes)
      prisma.purchase.groupBy({
        by: ['templateId'],
        where: { status: 'SUCCEEDED' },
        _count: { id: true },
        _sum: { amount: true },
        orderBy: { _count: { id: 'desc' } },
        take: 5
      }),

      // Statistiques mensuelles - utilisateurs (6 derniers mois)
      prisma.$queryRaw<Array<{ month: string, count: bigint }>>`
        SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, COUNT(*) as count
        FROM user
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
        ORDER BY month DESC
        LIMIT 6
      `,

      // Statistiques mensuelles - achats (6 derniers mois)
      prisma.$queryRaw<Array<{ month: string, count: bigint, revenue: number }>>`
        SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, COUNT(*) as count, COALESCE(SUM(amount), 0) as revenue
        FROM purchases
        WHERE status = 'SUCCEEDED' AND createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
        ORDER BY month DESC
        LIMIT 6
      `
    ])

    // Récupérer les noms des templates pour les templates populaires
    const templateIds = popularTemplates.map(t => t.templateId)
    const templates = await prisma.template.findMany({
      where: { id: { in: templateIds } },
      select: { id: true, name: true }
    })
    const templateNameMap = new Map(templates.map(t => [t.id, t.name]))

    // Formater les achats récents
    const formattedRecentPurchases = recentPurchases.map(purchase => ({
      id: purchase.id,
      userName: purchase.user.name || purchase.user.email || 'Utilisateur',
      templateName: purchase.template.name,
      amount: purchase.amount,
      createdAt: purchase.createdAt.toISOString()
    }))

    // Formater les templates populaires
    const formattedPopularTemplates = popularTemplates.map(template => ({
      id: template.templateId,
      name: templateNameMap.get(template.templateId) || 'Template inconnu',
      purchaseCount: template._count.id,
      revenue: template._sum.amount || 0
    }))

    // Formater les stats mensuelles
    const monthNames: Record<string, string> = {
      '01': 'Janvier',
      '02': 'Février',
      '03': 'Mars',
      '04': 'Avril',
      '05': 'Mai',
      '06': 'Juin',
      '07': 'Juillet',
      '08': 'Août',
      '09': 'Septembre',
      '10': 'Octobre',
      '11': 'Novembre',
      '12': 'Décembre'
    }

    // Combiner les stats mensuelles utilisateurs et achats
    const userStatsMap = new Map(
      monthlyUserStats.map(s => [s.month, Number(s.count)])
    )
    const purchaseStatsMap = new Map(
      monthlyPurchaseStats.map(s => [s.month, { count: Number(s.count), revenue: Number(s.revenue) }])
    )

    // Obtenir tous les mois uniques
    const allMonths = new Set([
      ...monthlyUserStats.map(s => s.month),
      ...monthlyPurchaseStats.map(s => s.month)
    ])

    const formattedMonthlyStats = Array.from(allMonths)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 6)
      .map(month => {
        const [year, monthNum] = month.split('-')
        const purchaseData = purchaseStatsMap.get(month) || { count: 0, revenue: 0 }
        return {
          month: `${monthNames[monthNum]} ${year}`,
          users: userStatsMap.get(month) || 0,
          purchases: purchaseData.count,
          revenue: purchaseData.revenue
        }
      })

    const analytics = {
      totalUsers,
      totalPurchases,
      totalRevenue: revenueResult._sum.amount || 0,
      totalVisits: totalDocuments * 10, // Approximation basée sur les documents
      recentPurchases: formattedRecentPurchases,
      popularTemplates: formattedPopularTemplates,
      monthlyStats: formattedMonthlyStats
    }

    return NextResponse.json({
      success: true,
      analytics
    })

  } catch (error) {
    console.error("Erreur lors du chargement des analytics:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
