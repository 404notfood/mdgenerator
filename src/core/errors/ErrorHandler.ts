import { NextResponse } from 'next/server';

/**
 * Types d'erreurs personnalisées
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} non trouvé(e)`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Non autorisé') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Accès interdit') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400, 'BAD_REQUEST');
    this.name = 'BadRequestError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

/**
 * Gestionnaire centralisé des erreurs
 */
export class ErrorHandler {
  /**
   * Convertit une erreur en réponse HTTP
   */
  static toResponse(error: unknown): NextResponse {
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.message,
            code: error.code,
          },
        },
        { status: error.statusCode }
      );
    }

    if (error instanceof Error) {
      // Log l'erreur pour le débogage
      console.error('Erreur non gérée:', error);

      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Une erreur interne est survenue',
            code: 'INTERNAL_ERROR',
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Erreur inconnue',
          code: 'UNKNOWN_ERROR',
        },
      },
      { status: 500 }
    );
  }

  /**
   * Log une erreur avec contexte
   */
  static log(error: unknown, context?: string): void {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    
    if (error instanceof Error) {
      console.error(`[${timestamp}]${contextStr} ${error.name}: ${error.message}`);
      if (error.stack) {
        console.error(error.stack);
      }
    } else {
      console.error(`[${timestamp}]${contextStr} Erreur inconnue:`, error);
    }
  }

  /**
   * Vérifie si c'est une erreur opérationnelle (attendue)
   */
  static isOperationalError(error: unknown): boolean {
    return error instanceof AppError;
  }
}
