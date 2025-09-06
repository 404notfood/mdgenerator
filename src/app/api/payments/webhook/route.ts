import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    // TODO: Vérifier la signature du webhook Revolut
    const body = await request.json()
    
    // Pour le moment, nous simulons la réception d'un webhook Revolut
    // Dans un vrai scénario, il faudrait :
    // 1. Vérifier la signature du webhook
    // 2. Extraire les données de paiement
    // 3. Mettre à jour le statut de l'achat
    
    const { order_id, status, amount } = body

    if (!order_id) {
      return NextResponse.json(
        { error: "Order ID manquant" },
        { status: 400 }
      )
    }

    // Trouver l'achat correspondant
    const purchase = await prisma.purchase.findUnique({
      where: {
        revolutOrderId: order_id
      }
    })

    if (!purchase) {
      return NextResponse.json(
        { error: "Achat non trouvé" },
        { status: 404 }
      )
    }

    // Mettre à jour le statut de l'achat
    let newStatus: 'PENDING' | 'SUCCEEDED' | 'FAILED' = 'PENDING'
    
    switch (status) {
      case 'completed':
      case 'succeeded':
        newStatus = 'SUCCEEDED'
        break
      case 'failed':
      case 'cancelled':
        newStatus = 'FAILED'
        break
      default:
        newStatus = 'PENDING'
    }

    await prisma.purchase.update({
      where: { id: purchase.id },
      data: { status: newStatus }
    })

    console.log(`Paiement ${order_id} mis à jour: ${newStatus}`)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Erreur lors du traitement du webhook:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}