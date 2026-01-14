/**
 * 🆕 Route API Templates v2 - Architecture POO
 * 
 * Cette route démontre l'utilisation de la nouvelle architecture :
 * - ServiceFactory pour obtenir les services
 * - AuthService pour l'authentification
 * - ErrorHandler pour la gestion d'erreurs
 * - Validation automatique avec Zod
 * - Réponses standardisées
 */

import { NextRequest, NextResponse } from 'next/server';
import { ServiceFactory } from '@/core/factories/ServiceFactory';
import { ErrorHandler } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';
import { UserRole } from '@prisma/client';
import { CreateTemplateDto } from '@/modules/templates/dto/template.dto';

/**
 * GET /api/v2/templates
 * Liste les templates avec pagination et filtres
 * 
 * Query params:
 * - page: numéro de page (défaut: 1)
 * - limit: résultats par page (défaut: 10)
 * - category: filtrer par catégorie
 * - isPremium: filtrer premium (true/false)
 * - search: recherche textuelle
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extraction des paramètres de pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

    // Extraction des filtres
    const category = searchParams.get('category');
    const isPremium = searchParams.get('isPremium') === 'true';
    const search = searchParams.get('search');

    // Récupération du service via la Factory
    const templateService = ServiceFactory.getTemplateService();

    // Appel au service avec pagination et filtres
    const result = await templateService.listTemplates(
      { page, limit, sortBy, sortOrder },
      { 
        category: category as any,
        isPremium: isPremium ? true : undefined,
        search: search || undefined,
      }
    );

    // Réponse standardisée avec métadonnées
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
    // Gestion centralisée des erreurs
    ErrorHandler.log(error, 'GET /api/v2/templates');
    return ErrorHandler.toResponse(error);
  }
}

/**
 * POST /api/v2/templates
 * Crée un nouveau template
 * 
 * Nécessite : Rôle ADMIN
 * 
 * Body:
 * {
 *   "name": "Nom du template",
 *   "description": "Description détaillée",
 *   "category": "STARTUP",
 *   "price": 499,
 *   "content": "# Contenu Markdown",
 *   "isPremium": true
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authentification et vérification du rôle
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);
    await authService.requireRole(request.headers, UserRole.ADMIN);

    // 2. Récupération et parsing des données
    const data: CreateTemplateDto = await request.json();

    // 3. Utilisation du service (validation Zod automatique)
    const templateService = ServiceFactory.getTemplateService();
    const template = await templateService.createTemplate(data);

    // 4. Log de l'opération
    console.log(`Template créé par ${user.email}:`, template.id);

    // 5. Réponse avec code 201 (Created)
    return NextResponse.json({
      success: true,
      data: template,
      message: 'Template créé avec succès',
    }, { status: 201 });

  } catch (error) {
    ErrorHandler.log(error, 'POST /api/v2/templates');
    return ErrorHandler.toResponse(error);
  }
}
