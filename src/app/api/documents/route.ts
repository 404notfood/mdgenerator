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

    const documents = await prisma.document.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json(documents)

  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { title, content } = await request.json()

    const document = await prisma.document.create({
      data: {
        title: title || "Sans titre",
        content: content || "",
        userId: session.user.id
      }
    })

    return NextResponse.json(document)

  } catch (error) {
    console.error("Erreur lors de la création du document:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
