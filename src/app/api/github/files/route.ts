import { auth } from "@/lib/auth"
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

    // Get GitHub token from session (you'll need to add this to your auth setup)
    const githubToken = (session.user as any).githubToken

    if (!githubToken) {
      return NextResponse.json({ 
        error: "Token GitHub requis. Veuillez vous connecter avec GitHub." 
      }, { status: 400 })
    }

    // Fetch repository contents recursively to find all .md files
    const markdownFiles = await fetchMarkdownFiles(githubToken, repoFullName)

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