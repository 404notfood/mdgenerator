import { NextResponse } from "next/server"
import TurndownService from 'turndown'

export async function POST(request: Request) {
  try {
    const { content, filename } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: "Le contenu est requis" },
        { status: 400 }
      )
    }

    // Convertir HTML en Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      hr: '---',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      emDelimiter: '_',
    })

    // Ajouter des règles personnalisées pour les éléments spéciaux
    turndownService.addRule('strikethrough', {
      filter: ['del', 's'] as (keyof HTMLElementTagNameMap)[],
      replacement: function (content) {
        return '~~' + content + '~~'
      }
    })

    turndownService.addRule('highlight', {
      filter: function (node) {
        return node.nodeName === 'MARK' || node.classList?.contains('highlight')
      },
      replacement: function (content) {
        return '==' + content + '=='
      }
    })

    const markdownContent = turndownService.turndown(content)

    // Créer le nom de fichier
    const name = filename || `readme-${Date.now()}`
    const fullFilename = name.endsWith('.md') ? name : `${name}.md`

    // Retourner le fichier Markdown
    return new NextResponse(markdownContent, {
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