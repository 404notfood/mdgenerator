/**
 * 🆕 Route API Génération IA - Architecture POO
 * 
 * Démontre l'utilisation du service IA
 */

import { NextRequest, NextResponse } from 'next/server';
import { AIService, GenerateReadmeOptions } from '@/modules/ai/services/ai.service';
import { ErrorHandler, ForbiddenError } from '@/core/errors/ErrorHandler';
import { AuthService } from '@/lib/auth/AuthService';

/**
 * POST /api/v2/ai/generate
 * Génère un README avec l'IA
 * 
 * Nécessite : Utilisateur PREMIUM ou ADMIN
 * 
 * Body:
 * {
 *   "projectName": "Mon Projet",
 *   "description": "Description du projet",
 *   "technologies": ["Next.js", "TypeScript"],
 *   "features": ["Feature 1", "Feature 2"],
 *   "installCommand": "npm install",
 *   "license": "MIT",
 *   "includeBadges": true,
 *   "includeContribution": true
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Vérification que l'utilisateur est premium
    const authService = new AuthService();
    const user = await authService.getCurrentUser(request.headers);
    const isPremium = await authService.isPremium(request.headers);

    if (!isPremium) {
      throw new ForbiddenError(
        'Cette fonctionnalité est réservée aux utilisateurs premium'
      );
    }

    // 2. Récupération des options
    const options: GenerateReadmeOptions = await request.json();

    // 3. Génération avec le service IA
    const aiService = new AIService();
    const readme = await aiService.generateReadme(options);

    // 4. Log de l'utilisation
    console.log(`README généré pour ${user.email}: ${options.projectName}`);

    // 5. Réponse avec le contenu généré
    return NextResponse.json({
      success: true,
      data: {
        content: readme,
        projectName: options.projectName,
        generatedAt: new Date().toISOString(),
      },
      message: 'README généré avec succès',
    });

  } catch (error) {
    ErrorHandler.log(error, 'POST /api/v2/ai/generate');
    return ErrorHandler.toResponse(error);
  }
}
