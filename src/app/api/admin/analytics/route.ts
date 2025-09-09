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

    // For now, return demo data (later implement real analytics)
    const analytics = {
      totalUsers: 156,
      totalPurchases: 42,
      totalRevenue: 35650, // en centimes
      totalVisits: 3247,
      recentPurchases: [
        {
          id: '1',
          userName: 'Jean Dupont',
          templateName: 'Startup MVP',
          amount: 1500,
          createdAt: new Date().toISOString()
        },
        {
          id: '2', 
          userName: 'Marie Martin',
          templateName: 'Open Source Pro',
          amount: 990,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          userName: 'Pierre Durand',
          templateName: 'API Documentation',
          amount: 590,
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ],
      popularTemplates: [
        {
          id: '1',
          name: 'Startup MVP',
          purchaseCount: 15,
          revenue: 22500
        },
        {
          id: '2',
          name: 'Open Source Pro', 
          purchaseCount: 12,
          revenue: 11880
        },
        {
          id: '3',
          name: 'Data Science Project',
          purchaseCount: 8,
          revenue: 10320
        }
      ],
      monthlyStats: [
        {
          month: 'Janvier 2025',
          users: 34,
          purchases: 12,
          revenue: 8650
        },
        {
          month: 'Décembre 2024',
          users: 28,
          purchases: 15,
          revenue: 12300
        },
        {
          month: 'Novembre 2024',
          users: 22,
          purchases: 8,
          revenue: 6400
        }
      ]
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