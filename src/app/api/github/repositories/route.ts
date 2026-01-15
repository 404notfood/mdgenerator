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

    // Récupérer les repositories de l'utilisateur
    const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=50&type=all", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json"
      }
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des repositories")
    }

    const repos = await response.json()

    // Filtrer les repositories avec un README
    const reposWithReadme = await Promise.all(
      repos.map(async (repo: any) => {
        try {
          const readmeResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/vnd.github.v3+json"
            }
          })

          if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json()
            return {
              id: repo.id,
              name: repo.name,
              full_name: repo.full_name,
              description: repo.description,
              private: repo.private,
              updated_at: repo.updated_at,
              has_readme: true,
              readme_sha: readmeData.sha
            }
          }
        } catch (error) {
          // Ignorer les erreurs pour les repos sans README
        }

        return {
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          private: repo.private,
          updated_at: repo.updated_at,
          has_readme: false
        }
      })
    )

    // Filtrer uniquement les repos avec README
    const filteredRepos = reposWithReadme.filter(repo => repo.has_readme)

    return NextResponse.json(filteredRepos)

  } catch (error) {
    console.error("Erreur lors de la récupération des repositories:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}