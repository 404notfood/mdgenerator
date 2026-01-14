/**
 * 🆕 Route API Suggestions IA - Architecture POO
 */

import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/modules/ai/services/ai.service';
import { ErrorHandler, BadRequestError } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';

/**
 * POST /api/v2/ai/suggestions
 * Obtient des suggestions d'amélioration pour un document
 * 
 * Body:
 * {
 *   "content": "Contenu du document Markdown"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Authentification
    const authService = new AuthService();
    await authService.getCurrentUser(request.headers);

    // Récupération du contenu
    const { content } = await request.json();

    if (!content || typeof content !== 'string') {
      throw new BadRequestError('Le contenu est requis');
    }

    // Génération des suggestions
    const aiService = new AIService();
    const suggestions = await aiService.generateSuggestions(content);

    return NextResponse.json({
      success: true,
      data: {
        suggestions,
        count: suggestions.length,
      },
    });

  } catch (error) {
    ErrorHandler.log(error, 'POST /api/v2/ai/suggestions');
    return ErrorHandler.toResponse(error);
  }
}
