import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

// Default settings
const DEFAULT_SETTINGS = {
  freeUserCharacterLimit: 10000,
  premiumUserCharacterLimit: 100000,
  maxTemplatesPerFreeUser: 3,
  allowImageUpload: false,
  maintenanceMode: false
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est admin
    if ((session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: "Accès refusé - Admin requis" }, { status: 403 })
    }

    // For now, return default settings (later we'll store them in database)
    return NextResponse.json({ 
      success: true,
      settings: DEFAULT_SETTINGS 
    })

  } catch (error) {
    console.error("Erreur lors du chargement des paramètres:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est admin
    if ((session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: "Accès refusé - Admin requis" }, { status: 403 })
    }

    const settings = await request.json()

    // Validate settings
    if (typeof settings.freeUserCharacterLimit !== 'number' || 
        settings.freeUserCharacterLimit < 1000 ||
        settings.freeUserCharacterLimit > 50000) {
      return NextResponse.json({ error: "Limite gratuite invalide" }, { status: 400 })
    }

    if (typeof settings.premiumUserCharacterLimit !== 'number' || 
        settings.premiumUserCharacterLimit < 10000 ||
        settings.premiumUserCharacterLimit > 1000000) {
      return NextResponse.json({ error: "Limite premium invalide" }, { status: 400 })
    }

    // For now, just return success (later we'll save to database)
    // In a real implementation, you would save these to a settings table
    console.log('Settings would be saved:', settings)

    return NextResponse.json({ 
      success: true,
      message: "Paramètres sauvegardés",
      settings 
    })

  } catch (error) {
    console.error("Erreur lors de la sauvegarde des paramètres:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}