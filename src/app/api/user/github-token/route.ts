import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

// GET - Vérifier si un token GitHub est configuré
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { githubToken: true }
    })

    return NextResponse.json({
      hasToken: !!user?.githubToken
    })

  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// POST - Sauvegarder le token GitHub
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { token } = await request.json()

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token invalide" }, { status: 400 })
    }

    // Valider le token en testant l'API GitHub
    const testResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    })

    if (!testResponse.ok) {
      return NextResponse.json({ error: "Token GitHub invalide" }, { status: 400 })
    }

    const githubUser = await testResponse.json()

    // Sauvegarder le token
    await prisma.user.update({
      where: { id: session.user.id },
      data: { githubToken: token }
    })

    return NextResponse.json({
      success: true,
      githubUsername: githubUser.login
    })

  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// DELETE - Supprimer le token GitHub
export async function DELETE() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { githubToken: null }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
