/**
 * 🆕 Route API Document par ID - Architecture POO
 */

import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';
import { UpdateDocumentDto } from '@/modules/documents/dto/document.dto';

/**
 * GET /api/v2/documents/[id]
 * Récupère un document par son ID
 * Vérifie automatiquement que l'utilisateur est propriétaire
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const documentService = ServiceFactory.getDocumentService();
    const document = await documentService.getDocumentById(id, user.id);

    return NextResponse.json({
      success: true,
      data: document,
    });

  } catch (error) {
    ErrorHandler.log(error, `GET /api/v2/documents/${id}`);
    return ErrorHandler.toResponse(error);
  }
}

/**
 * PATCH /api/v2/documents/[id]
 * Met à jour un document
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const data: UpdateDocumentDto = await request.json();

    const documentService = ServiceFactory.getDocumentService();
    const document = await documentService.updateDocument(
      id,
      user.id,
      data
    );

    return NextResponse.json({
      success: true,
      data: document,
      message: 'Document mis à jour avec succès',
    });

  } catch (error) {
    ErrorHandler.log(error, `PATCH /api/v2/documents/${id}`);
    return ErrorHandler.toResponse(error);
  }
}

/**
 * DELETE /api/v2/documents/[id]
 * Supprime un document
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const documentService = ServiceFactory.getDocumentService();
    await documentService.deleteDocument(id, user.id);

    console.log(`Document ${id} supprimé par ${user.email}`);

    return NextResponse.json({
      success: true,
      message: 'Document supprimé avec succès',
    });

  } catch (error) {
    ErrorHandler.log(error, `DELETE /api/v2/documents/${id}`);
    return ErrorHandler.toResponse(error);
  }
}
