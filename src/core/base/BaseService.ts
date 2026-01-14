/**
 * Classe abstraite de base pour tous les services
 * Encapsule la logique métier
 */
export abstract class BaseService {
  /**
   * Valide les données avant traitement
   */
  protected validate<T>(schema: any, data: unknown): T {
    try {
      return schema.parse(data) as T;
    } catch (error: any) {
      throw new ValidationError('Données invalides', error.errors);
    }
  }

  /**
   * Log les opérations importantes
   */
  protected log(message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${this.constructor.name}] ${message}`, data || '');
  }

  /**
   * Log les erreurs
   */
  protected logError(message: string, error: any): void {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [${this.constructor.name}] ERROR: ${message}`, error);
  }
}

/**
 * Erreur de validation personnalisée
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
