import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const VALID_PROVIDERS = ["openai", "anthropic", "google", "mistral"] as const
type AIProvider = typeof VALID_PROVIDERS[number]

// GET - Récupérer le provider configuré (pas la clé)
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
      select: { aiProvider: true, aiApiKey: true }
    })

    return NextResponse.json({
      hasKey: !!user?.aiApiKey,
      provider: user?.aiProvider || null
    })

  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// POST - Sauvegarder la clé API
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { provider, apiKey } = await request.json()

    if (!provider || !VALID_PROVIDERS.includes(provider)) {
      return NextResponse.json({
        error: "Provider invalide. Choisissez: openai, anthropic, google, mistral"
      }, { status: 400 })
    }

    if (!apiKey || typeof apiKey !== "string" || apiKey.length < 10) {
      return NextResponse.json({ error: "Clé API invalide" }, { status: 400 })
    }

    // Valider la clé en testant l'API
    const isValid = await validateApiKey(provider as AIProvider, apiKey)

    if (!isValid) {
      return NextResponse.json({ error: "Clé API invalide ou expirée" }, { status: 400 })
    }

    // Sauvegarder la clé
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        aiProvider: provider,
        aiApiKey: apiKey
      }
    })

    return NextResponse.json({
      success: true,
      provider: provider
    })

  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// DELETE - Supprimer la clé API
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
      data: {
        aiProvider: null,
        aiApiKey: null
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// Validation des clés API
async function validateApiKey(provider: AIProvider, apiKey: string): Promise<boolean> {
  try {
    switch (provider) {
      case "openai":
        const openaiRes = await fetch("https://api.openai.com/v1/models", {
          headers: { Authorization: `Bearer ${apiKey}` }
        })
        return openaiRes.ok

      case "anthropic":
        // Anthropic n'a pas d'endpoint de validation simple, on teste avec un message minimal
        const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            max_tokens: 1,
            messages: [{ role: "user", content: "test" }]
          })
        })
        // 200 = ok, 401 = unauthorized (clé invalide)
        return anthropicRes.ok || anthropicRes.status !== 401

      case "google":
        const googleRes = await fetch(
          `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
        )
        return googleRes.ok

      case "mistral":
        const mistralRes = await fetch("https://api.mistral.ai/v1/models", {
          headers: { Authorization: `Bearer ${apiKey}` }
        })
        return mistralRes.ok

      default:
        return false
    }
  } catch (error) {
    console.error(`Erreur validation ${provider}:`, error)
    return false
  }
}
