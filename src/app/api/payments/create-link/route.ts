import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({ headers: request.headers })
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      )
    }

    const { templateId } = await request.json()

    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID requis" },
        { status: 400 }
      )
    }

    // Vérifier que le template existe
    const template = await prisma.template.findUnique({
      where: { 
        id: templateId,
        isActive: true
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: "Template non trouvé" },
        { status: 404 }
      )
    }

    // Vérifier que l'utilisateur n'a pas déjà acheté ce template
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_templateId: {
          userId: session.user.id,
          templateId
        }
      }
    })

    if (existingPurchase && existingPurchase.status === 'SUCCEEDED') {
      return NextResponse.json(
        { error: "Template déjà acheté" },
        { status: 400 }
      )
    }

    // Créer ou mettre à jour l'achat avec le statut PENDING
    const purchase = await prisma.purchase.upsert({
      where: {
        userId_templateId: {
          userId: session.user.id,
          templateId
        }
      },
      update: {
        status: 'PENDING',
        amount: template.price
      },
      create: {
        userId: session.user.id,
        templateId,
        status: 'PENDING',
        amount: template.price
      }
    })

    // TODO: En attendant l'intégration Revolut, retourner un lien fictif
    // Dans un vrai scénario, on appellerait l'API Revolut pour créer un lien de paiement
    
    const mockPaymentLink = `https://revolut.me/mock-payment?amount=${(template.price / 100).toFixed(2)}&reference=${purchase.id}`

    // Mettre à jour l'achat avec le lien de paiement fictif
    const updatedPurchase = await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        paymentLink: mockPaymentLink,
        revolutOrderId: `mock-${purchase.id}`
      }
    })

    return NextResponse.json({
      paymentLink: mockPaymentLink,
      purchaseId: purchase.id,
      amount: template.price,
      templateName: template.name
    })

  } catch (error) {
    console.error("Erreur lors de la création du lien de paiement:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}