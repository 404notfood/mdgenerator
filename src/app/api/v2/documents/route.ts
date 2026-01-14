/**
 * 🆕 Route API Documents - Architecture POO
 */

import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';
import { CreateDocumentDto } from '@/modules/documents/dto/document.dto';

/**
 * GET /api/v2/documents
 * Liste les documents de l'utilisateur courant
 * 
 * Query params:
 * - page: numéro de page
 * - limit: résultats par page
 * - search: recherche textuelle
 */
export async function GET(request: NextRequest) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    const documentService = ServiceFactory.getDocumentService();

    // Si recherche, utiliser la méthode de recherche
    if (search) {
      const documents = await documentService.searchDocuments(user.id, search);
      return NextResponse.json({
        success: true,
        data: documents,
      });
    }

    // Sinon, pagination classique
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await documentService.getUserDocumentsPaginated(
      user.id,
      { page, limit }
    );

    return NextResponse.json({
      success: true,
      data: result.items,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });

  } catch (error) {
    ErrorHandler.log(error, 'GET /api/v2/documents');
    return ErrorHandler.toResponse(error);
  }
}

/**
 * POST /api/v2/documents
 * Crée un nouveau document
 * 
 * Body:
 * {
 *   "title": "Titre du document",
 *   "content": "Contenu Markdown"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const data: CreateDocumentDto = await request.json();

    const documentService = ServiceFactory.getDocumentService();
    const document = await documentService.createDocument(user.id, data);

    console.log(`Document créé par ${user.email}:`, document.id);

    return NextResponse.json({
      success: true,
      data: document,
      message: 'Document créé avec succès',
    }, { status: 201 });

  } catch (error) {
    ErrorHandler.log(error, 'POST /api/v2/documents');
    return ErrorHandler.toResponse(error);
  }
}
