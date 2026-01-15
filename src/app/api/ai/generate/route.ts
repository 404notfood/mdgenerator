import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

interface GenerateRequest {
  projectName: string
  description?: string
  technologies?: string[]
  repoUrl?: string
  style?: "technical" | "marketing" | "minimal"
  language?: "fr" | "en"
}

const SYSTEM_PROMPT = `Tu es un expert en création de README professionnels pour GitHub.
Tu génères des README clairs, bien structurés et visuellement attrayants.

Règles:
- Utilise le Markdown GitHub
- Ajoute des emojis pertinents pour les titres
- Inclus des badges shields.io quand c'est approprié
- Structure: Titre, Description, Features, Installation, Usage, Configuration, Contributing, License
- Sois concis mais informatif
- Génère uniquement le contenu Markdown, pas d'explications supplémentaires`

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est premium
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true, aiProvider: true, aiApiKey: true }
    })

    if (!user || (user.role !== "PREMIUM" && user.role !== "ADMIN")) {
      return NextResponse.json({
        error: "Fonctionnalité réservée aux utilisateurs Premium"
      }, { status: 403 })
    }

    if (!user.aiProvider || !user.aiApiKey) {
      return NextResponse.json({
        error: "Veuillez configurer votre clé API IA dans les paramètres"
      }, { status: 400 })
    }

    const body: GenerateRequest = await request.json()

    if (!body.projectName) {
      return NextResponse.json({ error: "Nom du projet requis" }, { status: 400 })
    }

    // Construire le prompt utilisateur
    const userPrompt = buildUserPrompt(body)

    // Appeler l'API IA appropriée
    const content = await callAI(
      user.aiProvider,
      user.aiApiKey,
      userPrompt,
      body.language || "fr"
    )

    return NextResponse.json({
      success: true,
      content: content
    })

  } catch (error) {
    console.error("Erreur génération IA:", error)
    return NextResponse.json({
      error: "Erreur lors de la génération"
    }, { status: 500 })
  }
}

function buildUserPrompt(body: GenerateRequest): string {
  let prompt = `Génère un README professionnel pour le projet "${body.projectName}".`

  if (body.description) {
    prompt += `\n\nDescription: ${body.description}`
  }

  if (body.technologies && body.technologies.length > 0) {
    prompt += `\n\nTechnologies utilisées: ${body.technologies.join(", ")}`
  }

  if (body.repoUrl) {
    prompt += `\n\nURL du repository: ${body.repoUrl}`
  }

  if (body.style === "marketing") {
    prompt += `\n\nStyle: Marketing - Mets en avant les avantages et fonctionnalités de manière attractive.`
  } else if (body.style === "minimal") {
    prompt += `\n\nStyle: Minimal - Va droit au but, pas de superflu.`
  } else {
    prompt += `\n\nStyle: Technique - Documentation complète et détaillée.`
  }

  return prompt
}

async function callAI(
  provider: string,
  apiKey: string,
  userPrompt: string,
  language: string
): Promise<string> {
  const systemPrompt = language === "en"
    ? SYSTEM_PROMPT.replace("Tu es", "You are").replace("Tu génères", "You generate").replace("Règles:", "Rules:").replace("Utilise", "Use").replace("Ajoute", "Add").replace("Inclus", "Include").replace("Sois", "Be").replace("Génère uniquement", "Generate only")
    : SYSTEM_PROMPT

  switch (provider) {
    case "openai":
      return await callOpenAI(apiKey, systemPrompt, userPrompt)
    case "anthropic":
      return await callAnthropic(apiKey, systemPrompt, userPrompt)
    case "google":
      return await callGoogle(apiKey, systemPrompt, userPrompt)
    case "mistral":
      return await callMistral(apiKey, systemPrompt, userPrompt)
    default:
      throw new Error("Provider non supporté")
  }
}

async function callOpenAI(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 4000,
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || "Erreur OpenAI")
  }

  const data = await response.json()
  return data.choices[0].message.content
}

async function callAnthropic(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        { role: "user", content: userPrompt }
      ]
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || "Erreur Anthropic")
  }

  const data = await response.json()
  return data.content[0].text
}

async function callGoogle(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemPrompt}\n\n${userPrompt}` }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 4000,
          temperature: 0.7
        }
      })
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || "Erreur Google AI")
  }

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

async function callMistral(apiKey: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 4000,
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || "Erreur Mistral")
  }

  const data = await response.json()
  return data.choices[0].message.content
}
