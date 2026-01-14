/**
 * 🆕 Route API Analyse qualité - Architecture POO
 */

import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/modules/ai/services/ai.service';
import { ErrorHandler, BadRequestError } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';

/**
 * POST /api/v2/ai/analyze
 * Analyse la qualité d'un README
 * 
 * Body:
 * {
 *   "content": "Contenu du README à analyser"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);

    const { content } = await request.json();

    if (!content || typeof content !== 'string') {
      throw new BadRequestError('Le contenu est requis');
    }

    const aiService = new AIService();
    const analysis = await aiService.analyzeReadmeQuality(content);

    console.log(`Analyse effectuée pour ${user.email}: score ${analysis.score}/100`);

    return NextResponse.json({
      success: true,
      data: analysis,
    });

  } catch (error) {
    ErrorHandler.log(error, 'POST /api/v2/ai/analyze');
    return ErrorHandler.toResponse(error);
  }
}
