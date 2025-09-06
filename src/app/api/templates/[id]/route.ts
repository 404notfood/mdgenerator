import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const template = await prisma.template.findUnique({
      where: {
        id: params.id,
        isActive: true
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: "Template non trouvé" },
        { status: 404 }
      )
    }

    return NextResponse.json(template)
  } catch (error) {
    console.error("Erreur lors de la récupération du template:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const template = await prisma.template.update({
      where: {
        id: params.id
      },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(category && { category }),
        ...(price !== undefined && { price: Math.round(price * 100) }),
        ...(content && { content }),
        ...(htmlPreview && { htmlPreview }),
        ...(thumbnail && { thumbnail }),
        ...(isPremium !== undefined && { isPremium })
      }
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du template:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.template.update({
      where: {
        id: params.id
      },
      data: {
        isActive: false
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la suppression du template:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}