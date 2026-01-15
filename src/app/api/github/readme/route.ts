import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { marked } from "marked"

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { repo_full_name, file_path } = await request.json()

    if (!repo_full_name) {
      return NextResponse.json({ error: "Repository requis" }, { status: 400 })
    }

    // D'abord essayer le Personal Access Token de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { githubToken: true }
    })

    let accessToken = user?.githubToken

    // Fallback sur le token OAuth si pas de PAT
    if (!accessToken) {
      const account = await prisma.account.findFirst({
        where: {
          userId: session.user.id,
          providerId: "github"
        }
      })
      accessToken = account?.accessToken
    }

    if (!accessToken) {
      return NextResponse.json({ error: "Token GitHub non trouvé. Configurez un Personal Access Token dans les paramètres." }, { status: 400 })
    }

    // Récupérer le contenu du fichier Markdown
    const apiUrl = file_path
      ? `https://api.github.com/repos/${repo_full_name}/contents/${file_path}`
      : `https://api.github.com/repos/${repo_full_name}/readme`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: file_path ? "application/vnd.github.v3+json" : "application/vnd.github.v3.raw"
      }
    })

    if (!response.ok) {
      throw new Error(`Fichier ${file_path || 'README'} non trouvé`)
    }

    let markdownContent: string

    if (file_path) {
      const fileData = await response.json()
      if (fileData.encoding === 'base64') {
        markdownContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
      } else {
        markdownContent = fileData.content
      }
    } else {
      markdownContent = await response.text()
    }
    
    // Convertir le Markdown en HTML pour TipTap
    const htmlContent = await marked(markdownContent)

    // Extraire le nom du fichier pour le titre
    const fileName = file_path ? file_path.split('/').pop() || 'README' : 'README'
    
    // Créer un document avec le contenu du fichier
    const document = await prisma.document.create({
      data: {
        title: `${fileName} - ${repo_full_name}`,
        content: htmlContent, // Stocker en HTML pour TipTap
        userId: session.user.id
      }
    })

    return NextResponse.json({
      id: document.id,
      title: document.title,
      content: document.content
    })

  } catch (error) {
    console.error("Erreur lors de l'import du fichier Markdown:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'import du fichier Markdown" },
      { status: 500 }
    )
  }
}