/**
 * 🆕 Route API Duplication de document - Architecture POO
 */

import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';

/**
 * POST /api/v2/documents/[id]/duplicate
 * Duplique un document existant
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const documentService = ServiceFactory.getDocumentService();
    const duplicatedDocument = await documentService.duplicateDocument(
      id,
      user.id
    );

    return NextResponse.json({
      success: true,
      data: duplicatedDocument,
      message: 'Document dupliqué avec succès',
    }, { status: 201 });

  } catch (error) {
    ErrorHandler.log(error, `POST /api/v2/documents/${id}/duplicate`);
    return ErrorHandler.toResponse(error);
  }
}
