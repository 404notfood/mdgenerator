import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

const PREMIUM_PRICE = 500 // 5€ en centimes

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const userId = session.user.id

    // Vérifier si l'utilisateur a déjà premium
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (user?.role === 'PREMIUM' || user?.role === 'ADMIN') {
      return NextResponse.json({ 
        error: "Vous avez déjà accès aux fonctionnalités premium" 
      }, { status: 400 })
    }

    // Vérifier s'il y a déjà une commande premium en cours
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: userId,
        templateId: 'premium-upgrade', // ID spécial pour les upgrades premium
        status: 'PENDING'
      }
    })

    if (existingPurchase && existingPurchase.paymentLink) {
      return NextResponse.json({
        paymentUrl: existingPurchase.paymentLink,
        orderId: existingPurchase.revolutOrderId
      })
    }

    // Créer une commande Revolut
    const revolutResponse = await fetch('https://merchant.revolut.com/api/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REVOLUT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: PREMIUM_PRICE,
        currency: 'EUR',
        description: 'Upgrade Premium - README Generator',
        merchant_order_ext_ref: `premium-${userId}-${Date.now()}`,
        customer_email: user?.email,
        settlement_currency: 'EUR'
      })
    })

    if (!revolutResponse.ok) {
      const errorData = await revolutResponse.text()
      console.error('Erreur Revolut:', errorData)
      return NextResponse.json({ 
        error: "Erreur lors de la création du paiement" 
      }, { status: 500 })
    }

    const revolutOrder = await revolutResponse.json()

    // Sauvegarder la commande en base
    const purchase = await prisma.purchase.create({
      data: {
        userId: userId,
        templateId: 'premium-upgrade',
        amount: PREMIUM_PRICE,
        status: 'PENDING',
        revolutOrderId: revolutOrder.id,
        paymentLink: `https://pay.revolut.com/order/${revolutOrder.token}`
      }
    })

    return NextResponse.json({
      paymentUrl: purchase.paymentLink,
      orderId: purchase.revolutOrderId
    })

  } catch (error) {
    console.error("Erreur lors de la création de l'achat premium:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}