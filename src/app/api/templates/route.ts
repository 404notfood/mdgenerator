import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const isPremium = searchParams.get("premium")
    
    const templates = await prisma.template.findMany({
      where: {
        isActive: true,
        ...(category && { category: category as any }),
        ...(isPremium !== null && { isPremium: isPremium === "true" })
      },
      orderBy: [
        { isPremium: "asc" }, // Gratuits en premier
        { createdAt: "desc" }
      ],
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
        thumbnail: true,
        isPremium: true,
        createdAt: true
      }
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error("Erreur lors de la récupération des templates:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      name, 
      description, 
      category, 
      price, 
      content, 
      htmlPreview, 
      thumbnail, 
      isPremium 
    } = body

    const template = await prisma.template.create({
      data: {
        name,
        description,
        category,
        price: Math.round(price * 100), // Convert to cents
        content,
        htmlPreview,
        thumbnail,
        isPremium: isPremium ?? true,
        isActive: true
      }
    })

    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création du template:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}