import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur a accès aux fonctionnalités premium/admin
    const userRole = (session.user as any).role
    if (userRole !== 'ADMIN' && userRole !== 'PREMIUM') {
      return NextResponse.json({ error: "Accès Premium requis" }, { status: 403 })
    }

    const url = new URL(request.url)
    const repoFullName = url.searchParams.get('repo')

    if (!repoFullName) {
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
      return NextResponse.json({
        error: "Token GitHub non trouvé. Configurez un Personal Access Token dans les paramètres."
      }, { status: 400 })
    }

    // Fetch repository contents recursively to find all .md files
    const markdownFiles = await fetchMarkdownFiles(accessToken, repoFullName)

    return NextResponse.json(markdownFiles)

  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

async function fetchMarkdownFiles(token: string, repoFullName: string, path: string = ""): Promise<any[]> {
  const url = `https://api.github.com/repos/${repoFullName}/contents/${path}`
  
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const contents = await response.json()
    const markdownFiles: any[] = []

    for (const item of contents) {
      if (item.type === 'file' && item.name.endsWith('.md')) {
        markdownFiles.push({
          name: item.name,
          path: item.path,
          size: item.size,
          type: 'file'
        })
      } else if (item.type === 'dir') {
        // Recursively fetch files in subdirectories (limit depth to prevent infinite loops)
        if (path.split('/').length < 3) { // Max depth of 3
          const subFiles = await fetchMarkdownFiles(token, repoFullName, item.path)
          markdownFiles.push(...subFiles)
        }
      }
    }

    return markdownFiles
  } catch (error) {
    console.error(`Erreur lors de la récupération du contenu de ${path}:`, error)
    return []
  }
}