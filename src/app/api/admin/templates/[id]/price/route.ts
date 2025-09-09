import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const { price } = await request.json()

    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json({ error: "Prix invalide" }, { status: 400 })
    }

    // Mettre à jour le prix du template
    const updatedTemplate = await prisma.template.update({
      where: { id: params.id },
      data: { price }
    })

    return NextResponse.json({ 
      success: true,
      template: updatedTemplate 
    })

  } catch (error) {
    console.error("Erreur lors de la mise à jour du prix:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}