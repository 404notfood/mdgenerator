import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Pour des raisons de sécurité, on permet seulement à l'utilisateur avec cet email spécifique
    // de devenir admin (remplacez par votre email)
    const adminEmails = [
      "laurent.petit.web.dev@gmail.com", // Votre email ici
      "admin@404notfood.fr"
    ]

    if (!adminEmails.includes(session.user.email)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    // Mettre à jour le role en ADMIN
    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        role: "ADMIN"
      }
    })

    return NextResponse.json({ success: true, message: "Role admin attribué" })

  } catch (error) {
    console.error("Erreur lors de l'attribution du role admin:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}