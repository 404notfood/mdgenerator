import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    
    // Vérifier l'authentification
    const session = await auth.api.getSession({ headers: request.headers })
    
    if (!session) {
      return NextResponse.json(
        { error: "Non authentifié", hasAccess: false },
        { status: 401 }
      )
    }

    // Récupérer le template
    const template = await prisma.template.findUnique({
      where: {
        id: resolvedParams.id,
        isActive: true
      },
      select: {
        id: true,
        isPremium: true,
        price: true
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: "Template non trouvé", hasAccess: false },
        { status: 404 }
      )
    }

    // Si le template est gratuit, accès autorisé
    if (!template.isPremium) {
      return NextResponse.json({ 
        hasAccess: true, 
        reason: "free_template" 
      })
    }

    // Vérifier si l'utilisateur a acheté le template
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_templateId: {
          userId: session.user.id,
          templateId: resolvedParams.id
        },
        status: "SUCCEEDED"
      }
    })

    if (purchase) {
      return NextResponse.json({ 
        hasAccess: true, 
        reason: "purchased" 
      })
    }

    // Pas d'accès
    return NextResponse.json({ 
      hasAccess: false, 
      reason: "premium_required",
      price: template.price
    })

  } catch (error) {
    console.error("Erreur lors de la vérification d'accès:", error)
    return NextResponse.json(
      { error: "Erreur serveur", hasAccess: false },
      { status: 500 }
    )
  }
}