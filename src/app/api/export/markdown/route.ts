import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { content, filename } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: "Le contenu est requis" },
        { status: 400 }
      )
    }

    // Créer le nom de fichier
    const name = filename || `readme-${Date.now()}`
    const fullFilename = name.endsWith('.md') ? name : `${name}.md`

    // Retourner le fichier Markdown
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': `attachment; filename="${fullFilename}"`,
      },
    })
  } catch (error) {
    console.error("Erreur lors de l'export Markdown:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}