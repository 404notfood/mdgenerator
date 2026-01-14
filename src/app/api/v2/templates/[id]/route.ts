/**
 * 🆕 Route API Template par ID - Architecture POO
 */

import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';
import { UserRole } from '@prisma/client';
import { UpdateTemplateDto } from '@/modules/templates/dto/template.dto';

/**
 * GET /api/v2/templates/[id]
 * Récupère un template par son ID
 * 
 * Query params:
 * - includeContent: true/false (défaut: false)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const { searchParams } = new URL(request.url);
    const includeContent = searchParams.get('includeContent') === 'true';

    const templateService = ServiceFactory.getTemplateService();
    const template = await templateService.getTemplateById(
      id,
      includeContent
    );

    return NextResponse.json({
      success: true,
      data: template,
    });

  } catch (error) {
    ErrorHandler.log(error, `GET /api/v2/templates/${id}`);
    return ErrorHandler.toResponse(error);
  }
}

/**
 * PATCH /api/v2/templates/[id]
 * Met à jour un template
 * 
 * Nécessite : Rôle ADMIN
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);
    await authService.requireRole(request.headers, UserRole.ADMIN);

    const data: UpdateTemplateDto = await request.json();

    const templateService = ServiceFactory.getTemplateService();
    const template = await templateService.updateTemplate(id, data);

    console.log(`Template ${id} mis à jour par ${user.email}`);

    return NextResponse.json({
      success: true,
      data: template,
      message: 'Template mis à jour avec succès',
    });

  } catch (error) {
    ErrorHandler.log(error, `PATCH /api/v2/templates/${id}`);
    return ErrorHandler.toResponse(error);
  }
}

/**
 * DELETE /api/v2/templates/[id]
 * Supprime un template
 * 
 * Nécessite : Rôle ADMIN
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);
    await authService.requireRole(request.headers, UserRole.ADMIN);

    const templateService = ServiceFactory.getTemplateService();
    await templateService.deleteTemplate(id);

    console.log(`Template ${id} supprimé par ${user.email}`);

    return NextResponse.json({
      success: true,
      message: 'Template supprimé avec succès',
    });

  } catch (error) {
    ErrorHandler.log(error, `DELETE /api/v2/templates/${id}`);
    return ErrorHandler.toResponse(error);
  }
}
