import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification pour l'export HTML (fonctionnalité premium)
    const session = await auth.api.getSession({ headers: request.headers })
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentification requise pour l'export HTML" },
        { status: 401 }
      )
    }

    const { content, filename, includeStyles } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: "Le contenu est requis" },
        { status: 400 }
      )
    }

    // CSS pour le style GitHub-like
    const styles = includeStyles ? `
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
        line-height: 1.6;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
        color: #1f2328;
        background-color: #ffffff;
      }
      
      h1, h2, h3, h4, h5, h6 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
      }
      
      h1 { font-size: 2em; border-bottom: 1px solid #d1d9e0; padding-bottom: 0.3em; }
      h2 { font-size: 1.5em; border-bottom: 1px solid #d1d9e0; padding-bottom: 0.3em; }
      h3 { font-size: 1.25em; }
      h4 { font-size: 1em; }
      h5 { font-size: 0.875em; }
      h6 { font-size: 0.85em; color: #656d76; }
      
      p { margin-top: 0; margin-bottom: 16px; }
      
      ul, ol {
        margin-top: 0;
        margin-bottom: 16px;
        padding-left: 2em;
      }
      
      li { margin-bottom: 4px; }
      
      code {
        padding: 0.2em 0.4em;
        font-size: 85%;
        background-color: #f6f8fa;
        border-radius: 6px;
        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
      }
      
      pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border-radius: 6px;
        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
      }
      
      pre code {
        padding: 0;
        background-color: transparent;
        border-radius: 0;
      }
      
      blockquote {
        padding: 0 16px;
        color: #656d76;
        border-left: 4px solid #d1d9e0;
        margin: 0 0 16px 0;
      }
      
      table {
        border-collapse: collapse;
        border-spacing: 0;
        display: block;
        width: max-content;
        max-width: 100%;
        overflow: auto;
        margin-bottom: 16px;
      }
      
      table th, table td {
        padding: 6px 13px;
        border: 1px solid #d1d9e0;
      }
      
      table th {
        font-weight: 600;
        background-color: #f6f8fa;
      }
      
      img {
        max-width: 100%;
        height: auto;
        border-radius: 6px;
      }
      
      hr {
        height: 4px;
        padding: 0;
        margin: 24px 0;
        background-color: #d1d9e0;
        border: 0;
      }
      
      a {
        color: #0969da;
        text-decoration: none;
      }
      
      a:hover {
        text-decoration: underline;
      }
    </style>
    ` : ''

    // Template HTML complet
    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README</title>
    ${styles}
</head>
<body>
    ${content}
</body>
</html>`

    // Créer le nom de fichier
    const name = filename || `readme-${Date.now()}`
    const fullFilename = name.endsWith('.html') ? name : `${name}.html`

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${fullFilename}"`,
      },
    })
  } catch (error) {
    console.error("Erreur lors de l'export HTML:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}