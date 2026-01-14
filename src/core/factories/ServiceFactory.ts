import { TemplateService } from '@/modules/templates/services/template.service';
import { UserService } from '@/modules/users/services/user.service';
import { DocumentService } from '@/modules/documents/services/document.service';

/**
 * Factory pour créer et gérer les instances de services (Singleton)
 * Pattern Factory + Singleton pour éviter la création multiple d'instances
 */
export class ServiceFactory {
  private static templateServiceInstance: TemplateService | null = null;
  private static userServiceInstance: UserService | null = null;
  private static documentServiceInstance: DocumentService | null = null;

  /**
   * Récupère l'instance du TemplateService
   */
  static getTemplateService(): TemplateService {
    if (!this.templateServiceInstance) {
      this.templateServiceInstance = new TemplateService();
    }
    return this.templateServiceInstance;
  }

  /**
   * Récupère l'instance du UserService
   */
  static getUserService(): UserService {
    if (!this.userServiceInstance) {
      this.userServiceInstance = new UserService();
    }
    return this.userServiceInstance;
  }

  /**
   * Récupère l'instance du DocumentService
   */
  static getDocumentService(): DocumentService {
    if (!this.documentServiceInstance) {
      this.documentServiceInstance = new DocumentService();
    }
    return this.documentServiceInstance;
  }

  /**
   * Réinitialise toutes les instances (utile pour les tests)
   */
  static resetAll(): void {
    this.templateServiceInstance = null;
    this.userServiceInstance = null;
    this.documentServiceInstance = null;
  }
}
