import { auth as betterAuth } from '@/lib/auth';
import { UserService } from '@/modules/users/services/user.service';
import { UnauthorizedError, ForbiddenError } from '@/core/errors/ErrorHandler';
import { UserRole } from '@prisma/client';

/**
 * Service d'authentification orienté objet
 * Encapsule la logique d'authentification et d'autorisation
 */
export class AuthService {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Récupère la session de l'utilisateur courant
   */
  async getCurrentSession(headers: Headers): Promise<any> {
    try {
      const session = await betterAuth.api.getSession({ headers });
      
      if (!session) {
        throw new UnauthorizedError('Session invalide ou expirée');
      }

      return session;
    } catch (error) {
      throw new UnauthorizedError('Authentification requise');
    }
  }

  /**
   * Récupère l'utilisateur courant
   */
  async getCurrentUser(headers: Headers): Promise<any> {
    const session = await this.getCurrentSession(headers);
    
    if (!session.user) {
      throw new UnauthorizedError('Utilisateur non trouvé');
    }

    return session.user;
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   */
  async requireRole(headers: Headers, requiredRole: UserRole): Promise<void> {
    const user = await this.getCurrentUser(headers);

    if (!this.hasRole(user.role, requiredRole)) {
      throw new ForbiddenError(`Rôle ${requiredRole} requis`);
    }
  }

  /**
   * Vérifie si l'utilisateur a l'un des rôles spécifiés
   */
  async requireAnyRole(headers: Headers, roles: UserRole[]): Promise<void> {
    const user = await this.getCurrentUser(headers);

    const hasRequiredRole = roles.some(role => this.hasRole(user.role, role));

    if (!hasRequiredRole) {
      throw new ForbiddenError(`L'un des rôles suivants est requis: ${roles.join(', ')}`);
    }
  }

  /**
   * Vérifie si l'utilisateur est premium
   */
  async isPremium(headers: Headers): Promise<boolean> {
    try {
      const user = await this.getCurrentUser(headers);
      return user.role === UserRole.PREMIUM || user.role === UserRole.ADMIN;
    } catch {
      return false;
    }
  }

  /**
   * Vérifie si l'utilisateur est admin
   */
  async isAdmin(headers: Headers): Promise<boolean> {
    try {
      const user = await this.getCurrentUser(headers);
      return user.role === UserRole.ADMIN;
    } catch {
      return false;
    }
  }

  /**
   * Vérifie la hiérarchie des rôles
   */
  private hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    const roleHierarchy = {
      [UserRole.USER]: 1,
      [UserRole.PREMIUM]: 2,
      [UserRole.ADMIN]: 3,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }

  /**
   * Vérifie si l'utilisateur est le propriétaire d'une ressource
   */
  async isOwner(headers: Headers, resourceOwnerId: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser(headers);
      return user.id === resourceOwnerId;
    } catch {
      return false;
    }
  }

  /**
   * Vérifie si l'utilisateur peut accéder à une ressource
   * (propriétaire ou admin)
   */
  async canAccessResource(headers: Headers, resourceOwnerId: string): Promise<boolean> {
    const isOwner = await this.isOwner(headers, resourceOwnerId);
    const isAdmin = await this.isAdmin(headers);
    
    return isOwner || isAdmin;
  }

  /**
   * Extrait le token de l'en-tête Authorization
   */
  extractToken(headers: Headers): string | null {
    const authHeader = headers.get('authorization');
    
    if (!authHeader) return null;

    const [type, token] = authHeader.split(' ');
    
    if (type !== 'Bearer' || !token) return null;

    return token;
  }

  /**
   * Vérifie si une session est valide
   */
  async validateSession(sessionToken: string): Promise<boolean> {
    try {
      // Logique de validation avec better-auth
      return true; // À implémenter selon votre logique
    } catch {
      return false;
    }
  }
}
