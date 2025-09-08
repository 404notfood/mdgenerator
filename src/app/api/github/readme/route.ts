import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { repo_full_name } = await request.json()

    if (!repo_full_name) {
      return NextResponse.json({ error: "Repository requis" }, { status: 400 })
    }

    // Récupérer le token GitHub depuis l'account
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        providerId: "github"
      }
    })

    if (!account?.accessToken) {
      return NextResponse.json({ error: "Token GitHub non trouvé" }, { status: 400 })
    }

    // Récupérer le contenu du README
    const response = await fetch(`https://api.github.com/repos/${repo_full_name}/readme`, {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        Accept: "application/vnd.github.v3.raw"
      }
    })

    if (!response.ok) {
      throw new Error("README non trouvé")
    }

    const readmeContent = await response.text()

    // Créer un document avec le contenu du README
    const document = await prisma.document.create({
      data: {
        title: `README - ${repo_full_name}`,
        content: readmeContent,
        userId: session.user.id
      }
    })

    return NextResponse.json({
      id: document.id,
      title: document.title,
      content: document.content
    })

  } catch (error) {
    console.error("Erreur lors de l'import du README:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'import du README" },
      { status: 500 }
    )
  }
}